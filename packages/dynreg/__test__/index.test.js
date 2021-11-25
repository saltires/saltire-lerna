'use strict';

const { dynreg } = require('../lib');

test('1 Test dynreg', () => {
  expect(dynreg(['a', 'n', 'c'])).toEqual(new RegExp('^[0-9a-zA-Z\u4e00-\u9fa5]+$'));

  expect(dynreg(['a', 'n'])).toEqual(new RegExp('^[0-9a-zA-Z]+$'));

  expect(dynreg(['A', 'N'])).toEqual(new RegExp('^[0-9a-zA-Z]+$'));

  expect(dynreg('AN')).toEqual(new RegExp('^[0-9a-zA-Z]+$'));

  expect(dynreg('An')).toEqual(new RegExp('^[0-9a-zA-Z]+$'));

  expect(dynreg(['a'])).toEqual(new RegExp('^[a-zA-Z]+$'));

  // expect(dynreg(['s'])).toEqual(new RegExp('^.+$'));

  // expect(dynreg(['a', 's'])).toEqual(new RegExp('^.+$'));

  // expect(dynreg('as')).toEqual(new RegExp('^.+$'));

  // expect(dynreg('AS')).toEqual(new RegExp('^.+$'));

  expect(dynreg([])).toEqual(null);

  expect(dynreg(['', ''])).toEqual(null);

  expect(dynreg('')).toEqual(null);
});

test('2 Test 返回的正则的可用性', () => {
  expect(dynreg('C').test('中文')).toBe(true);
  expect(dynreg('C').test('')).toBe(false);
  expect(dynreg('C').test('a')).toBe(false);
  // expect(dynreg('CS').test(3)).toBe(true);
  expect(dynreg('a').test('C')).toBe(true);
  expect(dynreg('s').test('&^%')).toBe(true);
  expect(dynreg('a').test('&^%')).toBe(false);
  expect(dynreg('n').test(3)).toBe(true);
  expect(dynreg('n').test('33')).toBe(true);
  expect(dynreg('ns').test('33')).toBe(true);
  expect(dynreg('ns').test('33@骑士')).toBe(false);
  expect(dynreg('ns').test('33@')).toBe(true);
});

test('3 Test 返回的正则的可用性', () => {
  expect(dynreg('sc').test('中文')).toBe(true);
  expect(dynreg('sn').test('3')).toBe(true);
});
