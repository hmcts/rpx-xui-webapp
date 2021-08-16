
export function DateTimeMatcher(generateVal) {
    return {
        generate: generateVal,
        matcher: "^\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-][0-2]\\d[0-5]\\d|Z)$",
    };
}
