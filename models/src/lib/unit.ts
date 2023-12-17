export enum Unit {
  PX = 'px',
  PERCENT = '%',
  EM = 'em',
  REM = 'rem',
  VW = 'vw',
  VH = 'vh',
  VMIN = 'vmin',
  VMAX = 'vmax',
  CM = 'cm',
  MM = 'mm',
  IN = 'in',
  PT = 'pt',
  PC = 'pc',
  EX = 'ex',
  CH = 'ch',
  FR = 'fr',
  AUTO = 'auto',
  IC = 'ic',
  LH = 'lh',
  RLH = 'rlh',
  VI = 'vi',
  VB = 'vb',
  CQW = 'cqw',
  CQH = 'cqh',
  CQI = 'cqi',
  CQB = 'cqb',
  CQMIN = 'cqmin',
  CQMAX = 'cqmax',
  Q = 'q',
}

export const font_units = [
  Unit.EM,
  Unit.REM,
  Unit.CH,
  Unit.EX,
  Unit.IC,
  Unit.LH,
  Unit.RLH,
];

export const absolute_units = [
  Unit.PX,
  Unit.CM,
  Unit.MM,
  Unit.IN,
  Unit.PT,
  Unit.PC,
];

export const dynamic_units = [Unit.FR, Unit.AUTO, Unit.PERCENT];

export const viewport_units = [
  Unit.VW,
  Unit.VH,
  Unit.VMIN,
  Unit.VMAX,
  Unit.VB,
  Unit.VI,
];

export const container_units = [
  Unit.CQW,
  Unit.CQH,
  Unit.CQI,
  Unit.CQB,
  Unit.CQMIN,
  Unit.CQMAX,
];
