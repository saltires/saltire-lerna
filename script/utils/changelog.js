const { htmlEscape } = require("escape-goat");
const git = require("./git");

const isPackageCommit = (message) =>
  /^(\w*)\(([\w$.\-*/ ]*)\)?: (.*)$/.test(message);
const messageRegexp = /^(\w*)(?:\(([\w$.\-*/ ]*)\))?: (.*)$/;
const UNRELEASED_TAG = "___unreleased___";

const labels = {
  breaking: ":boom: Breaking Change",
  feat: ":rocket: Enhancement",
  fix: ":bug: Bug Fix",
  docs: ":memo: Documentation",
  internal: ":house: Internal",
};

const header = `---
sidebar: auto
---

# 更新记录

`;

let latestChangelog = "";

function getPackage(message) {
  if (isPackageCommit(message)) {
    const label = message.split(": ")[0],
      leftBracketIndex = label.indexOf("("),
      rightBracketIndex = label.indexOf(")");
    return label.substring(leftBracketIndex + 1, rightBracketIndex);
  }

  return null;
}

function getToday() {
  const date = new Date().toISOString();
  return date.slice(0, date.indexOf("T"));
}

function parseLogMessage(commit) {
  const parts = commit.match(/ref<(.*)> message<(.*)> date<(.*)>/) || [];

  if (!parts || parts.length === 0) {
    return null;
  }

  const [refName, message, date] = parts.slice(1);

  let tagsInCommit;
  if (refName.length > 1) {
    const TAG_PREFIX = "tag: ";

    // Since there might be multiple tags referenced by the same commit,q
    // we need to treat all of them as a list.
    tagsInCommit = refName
      .split(", ")
      .filter((ref) => ref.startsWith(TAG_PREFIX))
      .map((ref) => ref.substr(TAG_PREFIX.length));
  }

  return {
    tags: tagsInCommit,
    message: isPackageCommit(message)
      ? message.replace(/^(\w*)\(([\w$.\-*/ ]*)\)?: /, "")
      : message,
    label: Object.keys(labels).find((label) => message.startsWith(label)),
    package: getPackage(message),
    date,
  };
}

function groupByRelease(allCommits) {
  // Analyze the commits and group them by tag.
  // This is useful to generate multiple release logs in case there are
  // multiple release tags.
  let releaseMap = {};

  let currentTags = [UNRELEASED_TAG];
  for (const commit of allCommits) {
    if (commit.tags && commit.tags.length > 0) {
      currentTags = commit.tags;
    }

    // Tags referenced by commits are treated as a list. When grouping them,
    // we split the commits referenced by multiple tags in their own group.
    // This results in having one group of commits for each tag, even if
    // the same commits are "duplicated" across the different tags
    // referencing them.
    for (const currentTag of currentTags) {
      if (!releaseMap[currentTag]) {
        let date = currentTag === UNRELEASED_TAG ? getToday() : commit.date;
        releaseMap[currentTag] = { name: currentTag, date, commits: [] };
      }

      releaseMap[currentTag].commits.push(commit);
    }
  }

  return Object.keys(releaseMap).map((tag) => releaseMap[tag]);
}

function renderRelease(release) {
  let { name, date, commits } = release;

  if (name === UNRELEASED_TAG) {
    return;
  }

  latestChangelog += `## ${name}\n\n`;

  // 不同的 tag 下可能有重复的提交记录
  commits = commits.filter(({ label, package }) => {
    if (Boolean(label) && Boolean(package)) {
      if (package.startsWith("hui-")) {
        package = package.replace("hui-", "");
      }

      // 如果时插件的更新记录必须完全匹配，类似 hui-plugin-micro-app 和 hui-micro-app 的记录可能分不开
      if (name.indexOf("plugin")) {
        return name.startsWith(`hui-${package}`);
      }

      return name.indexOf(package) > -1;
    }

    return false;
  });

  if (commits.length) {
    commits.forEach(({ label, message }) => {
      latestChangelog += `- ${label}: ${message} (${date})\n`;
    });
  } else {
    latestChangelog += `**Note:** Version bump only for package ${name}\n`;
  }

  latestChangelog += "\n\n\n";
}

async function getChangelog(latestTag, originalChangelog) {
  let allCommits = await git.commitsFromRevision(latestTag);

  if (allCommits.length <= 0) {
    throw "zero new commits found !";
  }

  allCommits = allCommits.map((commit) => parseLogMessage(commit));

  groupByRelease(allCommits).forEach(renderRelease);

  return `${header}${latestChangelog}${originalChangelog.substring(
    header.length
  )}`;
}

exports.getChangelog = getChangelog;
