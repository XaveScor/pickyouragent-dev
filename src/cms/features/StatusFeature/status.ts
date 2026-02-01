export enum Status {
  Supported = "supported",
  PartiallySupported = "partially-supported",
  NotSupported = "not-supported",
  NotVerified = "not-verified",
}

/**
 * Point multipliers for scoring calculations
 */
export const STATUS_POINTS = {
  /**
   * For features (base points):
   * - Supported and PartiallySupported both count as full points
   */
  feature: {
    [Status.Supported]: 1.0,
    [Status.PartiallySupported]: 1.0,
    [Status.NotSupported]: 0.0,
    [Status.NotVerified]: 0.0,
  },
  /**
   * For subfeatures:
   * - PartiallySupported counts as half points
   */
  subfeature: {
    [Status.Supported]: 1.0,
    [Status.PartiallySupported]: 0.5,
    [Status.NotSupported]: 0.0,
    [Status.NotVerified]: 0.0,
  },
} as const;
