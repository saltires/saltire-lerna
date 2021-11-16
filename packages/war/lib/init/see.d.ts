import { Context } from './types';
export interface PackDir {
  source: string;
  destination: string;
}
/**
 * After all sub-applications are packaged, see releases are made
 * @param {object}} state
 */
export default function (state: Context): Promise<void>;
