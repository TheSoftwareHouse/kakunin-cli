export function check(text: any, opts: any): any;
export function clearConfigCache(): void;
export const doc: {
  builders: {
    addAlignmentToDoc: Function;
    align: Function;
    breakParent: {
      type: string;
    };
    concat: Function;
    conditionalGroup: Function;
    cursor: {
      placeholder: symbol;
      type: string;
    };
    dedent: Function;
    dedentToRoot: Function;
    fill: Function;
    group: Function;
    hardline: {
      parts: any[];
      type: string;
    };
    ifBreak: Function;
    indent: Function;
    join: Function;
    line: {
      type: string;
    };
    lineSuffix: Function;
    lineSuffixBoundary: {
      type: string;
    };
    literalline: {
      parts: any[];
      type: string;
    };
    markAsRoot: Function;
    softline: {
      soft: boolean;
      type: string;
    };
    trim: {
      type: string;
    };
  };
  debug: {
    printDocToDebug: Function;
  };
  printer: {
    printDocToString: Function;
  };
  utils: {
    isEmpty: Function;
    isLineNext: Function;
    mapDoc: Function;
    propagateBreaks: Function;
    removeLines: Function;
    stripTrailingHardline: Function;
    traverseDoc: Function;
    willBreak: Function;
  };
};
export function format(text: any, opts: any): any;
export function formatWithCursor(...args: any[]): any;
export function getFileInfo(...args: any[]): any;
export namespace getFileInfo {
  function sync(...args: any[]): any;
}
export function getSupportInfo(...args: any[]): any;
export function resolveConfig(filePath: any, opts: any): any;
export namespace resolveConfig {
  function sync(filePath: any, opts: any): any;
}
export function resolveConfigFile(filePath: any): any;
export namespace resolveConfigFile {
  function sync(filePath: any): any;
}
export namespace util {
  function addDanglingComment(node: any, comment: any): void;
  function addLeadingComment(node: any, comment: any): void;
  function addTrailingComment(node: any, comment: any): void;
  function getAlignmentSize(value: any, tabWidth: any, startIndex: any): any;
  function getIndentSize(value: any, tabWidth: any): any;
  function getMaxContinuousCount(str: any, target: any): any;
  function getNextNonSpaceNonCommentCharacterIndex(text: any, node: any, options: any): any;
  function getStringWidth(text: any): any;
  function hasNewline(text: any, index: any, opts: any): any;
  function hasNewlineInRange(text: any, start: any, end: any): any;
  function hasSpaces(text: any, index: any, opts: any): any;
  function isNextLineEmpty(text: any, node: any, options: any): any;
  function isNextLineEmptyAfterIndex(text: any, index: any): any;
  function isPreviousLineEmpty(text: any, node: any, options: any): any;
  function makeString(rawContent: any, enclosingQuote: any, unescapeUnnecessaryEscapes: any): any;
  function mapDoc(doc: any, cb: any): any;
  function skip(chars: any): any;
  function skipEverythingButNewLine(text: any, index: any, opts: any): any;
  function skipInlineComment(text: any, index: any): any;
  function skipNewline(text: any, index: any, opts: any): any;
  function skipSpaces(text: any, index: any, opts: any): any;
  function skipToLineEnd(text: any, index: any, opts: any): any;
  function skipTrailingComment(text: any, index: any): any;
  function skipWhitespace(text: any, index: any, opts: any): any;
}
export const version: string;
