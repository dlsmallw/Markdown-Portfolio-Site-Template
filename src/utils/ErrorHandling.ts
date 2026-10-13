/**
 * Used to condense simple variable operations that can result in an error into a single line.
 * @param fn            The function/operation to be attempted.
 * @param fallback      The alternate fallback result if an error occurs.
 * @returns             The function/operation or the fallback.
 */
export function inlineTryCatch<T, R>(fn: () => T, fallback: R): T | R {
    try {
        return fn();
    } catch (error) {
        return fallback;
    }
}