export const referenceContainers = ['viewport', 'container'] as const;
export type ReferenceContainer = (typeof referenceContainers)[number];

export function isReferenceContainer(
  referenceContainer: string | undefined
): referenceContainer is ReferenceContainer {
  return (
    referenceContainer !== undefined &&
    referenceContainers.includes(referenceContainer as ReferenceContainer)
  );
}
