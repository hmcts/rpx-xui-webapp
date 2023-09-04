import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/*
Translate a date time format string from the Java format provided by CCD to the format supported by Angular formatDate()
Very simple translator that maps unsupported chars to the nearest equivalent.
If there is no equivalent puts ***x*** into the output where x is the unsupported character

Java format
G       era                         text              AD; Anno Domini; A
   u       year                        year              2004; 04
   y       year-of-era                 year              2004; 04
   D       day-of-year                 number            189
   M/L     month-of-year               number/text       7; 07; Jul; July; J
   d       day-of-month                number            10

   Q/q     quarter-of-year             number/text       3; 03; Q3; 3rd quarter
   Y       week-based-year             year              1996; 96
   w       week-of-week-based-year     number            27
   W       week-of-month               number            4
   E       day-of-week                 text              Tue; Tuesday; T
   e/c     localized day-of-week       number/text       2; 02; Tue; Tuesday; T
   F       week-of-month               number            3

   a       am-pm-of-day                text              PM
   h       clock-hour-of-am-pm (1-12)  number            12
   K       hour-of-am-pm (0-11)        number            0
   k       clock-hour-of-am-pm (1-24)  number            0

   H       hour-of-day (0-23)          number            0
   m       minute-of-hour              number            30
   s       second-of-minute            number            55
   S       fraction-of-second          fraction          978
   A       milli-of-day                number            1234
   n       nano-of-second              number            987654321
   N       nano-of-day                 number            1234000000

   V       time-zone ID                zone-id           America/Los_Angeles; Z; -08:30
   z       time-zone name              zone-name         Pacific Standard Time; PST
   O       localized zone-offset       offset-O          GMT+8; GMT+08:00; UTC-08:00;
   X       zone-offset 'Z' for zero    offset-X          Z; -08; -0830; -08:30; -083015; -08:30:15;
   x       zone-offset                 offset-x          +0000; -08; -0830; -08:30; -083015; -08:30:15;
   Z       zone-offset                 offset-Z          +0000; -0800; -08:00;

   p       pad next                    pad modifier      1

   '       escape for text             delimiter
   ''      single quote                literal           '
   [       optional section start
   ]       optional section end
   #       reserved for future use
   {       reserved for future use
   }       reserved for future use

 Angular dateFormat characters
 Era	G, GG & GGG	Abbreviated	AD
GGGG	Wide	Anno Domini
GGGGG	Narrow	A
Year	y	Numeric: minimum digits	2, 20, 201, 2017, 20173
yy	Numeric: 2 digits + zero padded	02, 20, 01, 17, 73
yyy	Numeric: 3 digits + zero padded	002, 020, 201, 2017, 20173
yyyy	Numeric: 4 digits or more + zero padded	0002, 0020, 0201, 2017, 20173
Month	M	Numeric: 1 digit	9, 12
MM	Numeric: 2 digits + zero padded	09, 12
MMM	Abbreviated	Sep
MMMM	Wide	September
MMMMM	Narrow	S
Month standalone	L	Numeric: 1 digit	9, 12
LL	Numeric: 2 digits + zero padded	09, 12
LLL	Abbreviated	Sep
LLLL	Wide	September
LLLLL	Narrow	S
Week of year	w	Numeric: minimum digits	1... 53
ww	Numeric: 2 digits + zero padded	01... 53
Week of month	W	Numeric: 1 digit	1... 5
Day of month	d	Numeric: minimum digits	1
dd	Numeric: 2 digits + zero padded	01
Week day	E, EE & EEE	Abbreviated	Tue
EEEE	Wide	Tuesday
EEEEE	Narrow	T
EEEEEE	Short	Tu
Period	a, aa & aaa	Abbreviated	am/pm or AM/PM
aaaa	Wide (fallback to a when missing)	ante meridiem/post meridiem
aaaaa	Narrow	a/p
Period*	B, BB & BBB	Abbreviated	mid.
BBBB	Wide	am, pm, midnight, noon, morning, afternoon, evening, night
BBBBB	Narrow	md
Period standalone*	b, bb & bbb	Abbreviated	mid.
bbbb	Wide	am, pm, midnight, noon, morning, afternoon, evening, night
bbbbb	Narrow	md
Hour 1-12	h	Numeric: minimum digits	1, 12
hh	Numeric: 2 digits + zero padded	01, 12
Hour 0-23	H	Numeric: minimum digits	0, 23
HH	Numeric: 2 digits + zero padded	00, 23
Minute	m	Numeric: minimum digits	8, 59
mm	Numeric: 2 digits + zero padded	08, 59
Second	s	Numeric: minimum digits	0... 59
ss	Numeric: 2 digits + zero padded	00... 59
Fractional seconds	S	Numeric: 1 digit	0... 9
SS	Numeric: 2 digits + zero padded	00... 99
SSS	Numeric: 3 digits + zero padded (= milliseconds)	000... 999
Zone	z, zz & zzz	Short specific non location format (fallback to O)	GMT-8
zzzz	Long specific non location format (fallback to OOOO)	GMT-08:00
Z, ZZ & ZZZ	ISO8601 basic format	-0800
ZZZZ	Long localized GMT format	GMT-8:00
ZZZZZ	ISO8601 extended format + Z indicator for offset 0 (= XXXXX)	-08:00
O, OO & OOO	Short localized GMT format	GMT-8
OOOO	Long localized GMT format	GMT-08:00
 */
export class FormatTranslatorService {
    translate(javaFormat) {
        const result = [];
        let prev = '\0';
        let inQuote = false;
        const maybePush = (target, obj, flag) => {
            if (!flag) {
                target.push(obj);
            }
        };
        for (const c of javaFormat) {
            switch (c) {
                case '\'':
                    if (prev === '\'') {
                        // literal single quote - ignore
                        inQuote = false;
                    }
                    else {
                        inQuote = !inQuote;
                    }
                    break;
                // Due to formatting constraints on the webapp, all 'd' characters should be replaced with 'D' (for Moment library)
                // This is because we want the date, not the day (this format will need to be converted back)
                case 'd':
                    maybePush(result, 'D', inQuote);
                    break;
                // moment library defines year as capital y
                case 'y':
                    maybePush(result, 'Y', inQuote);
                    break;
                case 'e':
                case 'c':
                    maybePush(result, 'E', inQuote); // no lower case E
                    break;
                case 'F':
                    maybePush(result, 'W', inQuote);
                    break;
                case 'K':
                    maybePush(result, 'H', inQuote);
                    break;
                case 'k':
                    maybePush(result, 'h', inQuote);
                    break;
                // commented out A change to '***' due to use in moment library for AM/PM
                // added 'a' specification to stop discrepancy in am/AM pm/PM formatting
                case 'a':
                    maybePush(result, 'A', inQuote);
                    break;
                case 'n':
                case 'N':
                    maybePush(result, `***${c}***`, inQuote); // No way to support A - millisec of day, n - nano of second, N - nano of Day
                    break;
                case 'V':
                case 'O':
                    maybePush(result, 'z', inQuote);
                    break;
                case 'x':
                case 'X':
                    maybePush(result, 'Z', inQuote);
                    break;
                default:
                    maybePush(result, c, inQuote);
            }
            prev = c;
        }
        return result.join('');
    }
    showOnlyDates(dateFormat) {
        // replace 'd' character with 'D' for the moment library
        // This ensures only dates allowed
        while (dateFormat.includes('d')) {
            dateFormat = dateFormat.replace('d', 'D');
        }
        while (dateFormat.includes('y')) {
            dateFormat = dateFormat.replace('y', 'Y');
        }
        return dateFormat;
    }
    removeTime(dateFormat) {
        // remove hours irrelevant of whether 12 or 24 hour clock
        while (dateFormat.includes('H') || dateFormat.includes('h')) {
            dateFormat = dateFormat.replace('H', '');
            dateFormat = dateFormat.replace('h', '');
        }
        // remove minutes
        while (dateFormat.includes('m')) {
            dateFormat = dateFormat.replace('m', '');
        }
        // remove seconds (s) and micro seconds (S)
        while (dateFormat.includes('S') || dateFormat.includes('s')) {
            dateFormat = dateFormat.replace('S', '');
            dateFormat = dateFormat.replace('s', '');
        }
        // because there is time removal algorithm can make reasonable assumption to remove colons
        while (dateFormat.includes(':')) {
            dateFormat = dateFormat.replace(':', '');
        }
        return dateFormat.trim();
    }
    hasDate(value) {
        return this.translate(value).length &&
            value.toLowerCase().indexOf('d') >= 0 &&
            value.indexOf('M') >= 0 && value.toLowerCase().indexOf('y') >= 0;
    }
    is24Hour(value) {
        return this.translate(value).length &&
            value.indexOf('H') >= 0;
    }
    hasNoDay(value) {
        return this.translate(value).length && value.toLowerCase().indexOf('d') === -1 &&
            value.indexOf('M') >= 0 && value.toLowerCase().indexOf('y') >= 0;
    }
    hasNoDayAndMonth(value) {
        return this.translate(value).length &&
            value.toLowerCase().indexOf('d') === -1 &&
            value.indexOf('M') === -1 &&
            value.toLowerCase().indexOf('y') >= 0;
    }
    hasHours(value) {
        return this.translate(value).length && value.toLowerCase().indexOf('h') >= 0 && value.indexOf('m') === -1;
    }
    hasMinutes(value) {
        return this.translate(value).length && value.indexOf('m') >= 0 && value.toLowerCase().indexOf('h') >= 0;
    }
    hasSeconds(value) {
        return this.translate(value).length && value.toLowerCase().indexOf('s') >= 0;
    }
}
FormatTranslatorService.ɵfac = function FormatTranslatorService_Factory(t) { return new (t || FormatTranslatorService)(); };
FormatTranslatorService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FormatTranslatorService, factory: FormatTranslatorService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormatTranslatorService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXRyYW5zbGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvY2FzZS1maWVsZHMvZm9ybWF0LXRyYW5zbGF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUdHO0FBR0gsTUFBTSxPQUFPLHVCQUF1QjtJQUMzQixTQUFTLENBQUMsVUFBa0I7UUFDakMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFcEIsTUFBTSxTQUFTLEdBQUcsQ0FBSSxNQUFXLEVBQUUsR0FBTSxFQUFFLElBQWEsRUFBRSxFQUFFO1lBQzFELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUMsQ0FBQztRQUNGLEtBQUssTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxFQUFFO2dCQUNULEtBQUssSUFBSTtvQkFDUCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7d0JBQ2pCLGdDQUFnQzt3QkFDaEMsT0FBTyxHQUFHLEtBQUssQ0FBQztxQkFDakI7eUJBQU07d0JBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO3FCQUNwQjtvQkFDRCxNQUFNO2dCQUNSLG1IQUFtSDtnQkFDbkgsNkZBQTZGO2dCQUM3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LENBQUM7OzhGQXZJVSx1QkFBdUI7NkVBQXZCLHVCQUF1QixXQUF2Qix1QkFBdUI7dUZBQXZCLHVCQUF1QjtjQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKlxuVHJhbnNsYXRlIGEgZGF0ZSB0aW1lIGZvcm1hdCBzdHJpbmcgZnJvbSB0aGUgSmF2YSBmb3JtYXQgcHJvdmlkZWQgYnkgQ0NEIHRvIHRoZSBmb3JtYXQgc3VwcG9ydGVkIGJ5IEFuZ3VsYXIgZm9ybWF0RGF0ZSgpXG5WZXJ5IHNpbXBsZSB0cmFuc2xhdG9yIHRoYXQgbWFwcyB1bnN1cHBvcnRlZCBjaGFycyB0byB0aGUgbmVhcmVzdCBlcXVpdmFsZW50LlxuSWYgdGhlcmUgaXMgbm8gZXF1aXZhbGVudCBwdXRzICoqKngqKiogaW50byB0aGUgb3V0cHV0IHdoZXJlIHggaXMgdGhlIHVuc3VwcG9ydGVkIGNoYXJhY3RlclxuXG5KYXZhIGZvcm1hdFxuRyAgICAgICBlcmEgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgICAgICAgICAgICAgQUQ7IEFubm8gRG9taW5pOyBBXG4gICB1ICAgICAgIHllYXIgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyICAgICAgICAgICAgICAyMDA0OyAwNFxuICAgeSAgICAgICB5ZWFyLW9mLWVyYSAgICAgICAgICAgICAgICAgeWVhciAgICAgICAgICAgICAgMjAwNDsgMDRcbiAgIEQgICAgICAgZGF5LW9mLXllYXIgICAgICAgICAgICAgICAgIG51bWJlciAgICAgICAgICAgIDE4OVxuICAgTS9MICAgICBtb250aC1vZi15ZWFyICAgICAgICAgICAgICAgbnVtYmVyL3RleHQgICAgICAgNzsgMDc7IEp1bDsgSnVseTsgSlxuICAgZCAgICAgICBkYXktb2YtbW9udGggICAgICAgICAgICAgICAgbnVtYmVyICAgICAgICAgICAgMTBcblxuICAgUS9xICAgICBxdWFydGVyLW9mLXllYXIgICAgICAgICAgICAgbnVtYmVyL3RleHQgICAgICAgMzsgMDM7IFEzOyAzcmQgcXVhcnRlclxuICAgWSAgICAgICB3ZWVrLWJhc2VkLXllYXIgICAgICAgICAgICAgeWVhciAgICAgICAgICAgICAgMTk5NjsgOTZcbiAgIHcgICAgICAgd2Vlay1vZi13ZWVrLWJhc2VkLXllYXIgICAgIG51bWJlciAgICAgICAgICAgIDI3XG4gICBXICAgICAgIHdlZWstb2YtbW9udGggICAgICAgICAgICAgICBudW1iZXIgICAgICAgICAgICA0XG4gICBFICAgICAgIGRheS1vZi13ZWVrICAgICAgICAgICAgICAgICB0ZXh0ICAgICAgICAgICAgICBUdWU7IFR1ZXNkYXk7IFRcbiAgIGUvYyAgICAgbG9jYWxpemVkIGRheS1vZi13ZWVrICAgICAgIG51bWJlci90ZXh0ICAgICAgIDI7IDAyOyBUdWU7IFR1ZXNkYXk7IFRcbiAgIEYgICAgICAgd2Vlay1vZi1tb250aCAgICAgICAgICAgICAgIG51bWJlciAgICAgICAgICAgIDNcblxuICAgYSAgICAgICBhbS1wbS1vZi1kYXkgICAgICAgICAgICAgICAgdGV4dCAgICAgICAgICAgICAgUE1cbiAgIGggICAgICAgY2xvY2staG91ci1vZi1hbS1wbSAoMS0xMikgIG51bWJlciAgICAgICAgICAgIDEyXG4gICBLICAgICAgIGhvdXItb2YtYW0tcG0gKDAtMTEpICAgICAgICBudW1iZXIgICAgICAgICAgICAwXG4gICBrICAgICAgIGNsb2NrLWhvdXItb2YtYW0tcG0gKDEtMjQpICBudW1iZXIgICAgICAgICAgICAwXG5cbiAgIEggICAgICAgaG91ci1vZi1kYXkgKDAtMjMpICAgICAgICAgIG51bWJlciAgICAgICAgICAgIDBcbiAgIG0gICAgICAgbWludXRlLW9mLWhvdXIgICAgICAgICAgICAgIG51bWJlciAgICAgICAgICAgIDMwXG4gICBzICAgICAgIHNlY29uZC1vZi1taW51dGUgICAgICAgICAgICBudW1iZXIgICAgICAgICAgICA1NVxuICAgUyAgICAgICBmcmFjdGlvbi1vZi1zZWNvbmQgICAgICAgICAgZnJhY3Rpb24gICAgICAgICAgOTc4XG4gICBBICAgICAgIG1pbGxpLW9mLWRheSAgICAgICAgICAgICAgICBudW1iZXIgICAgICAgICAgICAxMjM0XG4gICBuICAgICAgIG5hbm8tb2Ytc2Vjb25kICAgICAgICAgICAgICBudW1iZXIgICAgICAgICAgICA5ODc2NTQzMjFcbiAgIE4gICAgICAgbmFuby1vZi1kYXkgICAgICAgICAgICAgICAgIG51bWJlciAgICAgICAgICAgIDEyMzQwMDAwMDBcblxuICAgViAgICAgICB0aW1lLXpvbmUgSUQgICAgICAgICAgICAgICAgem9uZS1pZCAgICAgICAgICAgQW1lcmljYS9Mb3NfQW5nZWxlczsgWjsgLTA4OjMwXG4gICB6ICAgICAgIHRpbWUtem9uZSBuYW1lICAgICAgICAgICAgICB6b25lLW5hbWUgICAgICAgICBQYWNpZmljIFN0YW5kYXJkIFRpbWU7IFBTVFxuICAgTyAgICAgICBsb2NhbGl6ZWQgem9uZS1vZmZzZXQgICAgICAgb2Zmc2V0LU8gICAgICAgICAgR01UKzg7IEdNVCswODowMDsgVVRDLTA4OjAwO1xuICAgWCAgICAgICB6b25lLW9mZnNldCAnWicgZm9yIHplcm8gICAgb2Zmc2V0LVggICAgICAgICAgWjsgLTA4OyAtMDgzMDsgLTA4OjMwOyAtMDgzMDE1OyAtMDg6MzA6MTU7XG4gICB4ICAgICAgIHpvbmUtb2Zmc2V0ICAgICAgICAgICAgICAgICBvZmZzZXQteCAgICAgICAgICArMDAwMDsgLTA4OyAtMDgzMDsgLTA4OjMwOyAtMDgzMDE1OyAtMDg6MzA6MTU7XG4gICBaICAgICAgIHpvbmUtb2Zmc2V0ICAgICAgICAgICAgICAgICBvZmZzZXQtWiAgICAgICAgICArMDAwMDsgLTA4MDA7IC0wODowMDtcblxuICAgcCAgICAgICBwYWQgbmV4dCAgICAgICAgICAgICAgICAgICAgcGFkIG1vZGlmaWVyICAgICAgMVxuXG4gICAnICAgICAgIGVzY2FwZSBmb3IgdGV4dCAgICAgICAgICAgICBkZWxpbWl0ZXJcbiAgICcnICAgICAgc2luZ2xlIHF1b3RlICAgICAgICAgICAgICAgIGxpdGVyYWwgICAgICAgICAgICdcbiAgIFsgICAgICAgb3B0aW9uYWwgc2VjdGlvbiBzdGFydFxuICAgXSAgICAgICBvcHRpb25hbCBzZWN0aW9uIGVuZFxuICAgIyAgICAgICByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZVxuICAgeyAgICAgICByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZVxuICAgfSAgICAgICByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZVxuXG4gQW5ndWxhciBkYXRlRm9ybWF0IGNoYXJhY3RlcnNcbiBFcmFcdEcsIEdHICYgR0dHXHRBYmJyZXZpYXRlZFx0QURcbkdHR0dcdFdpZGVcdEFubm8gRG9taW5pXG5HR0dHR1x0TmFycm93XHRBXG5ZZWFyXHR5XHROdW1lcmljOiBtaW5pbXVtIGRpZ2l0c1x0MiwgMjAsIDIwMSwgMjAxNywgMjAxNzNcbnl5XHROdW1lcmljOiAyIGRpZ2l0cyArIHplcm8gcGFkZGVkXHQwMiwgMjAsIDAxLCAxNywgNzNcbnl5eVx0TnVtZXJpYzogMyBkaWdpdHMgKyB6ZXJvIHBhZGRlZFx0MDAyLCAwMjAsIDIwMSwgMjAxNywgMjAxNzNcbnl5eXlcdE51bWVyaWM6IDQgZGlnaXRzIG9yIG1vcmUgKyB6ZXJvIHBhZGRlZFx0MDAwMiwgMDAyMCwgMDIwMSwgMjAxNywgMjAxNzNcbk1vbnRoXHRNXHROdW1lcmljOiAxIGRpZ2l0XHQ5LCAxMlxuTU1cdE51bWVyaWM6IDIgZGlnaXRzICsgemVybyBwYWRkZWRcdDA5LCAxMlxuTU1NXHRBYmJyZXZpYXRlZFx0U2VwXG5NTU1NXHRXaWRlXHRTZXB0ZW1iZXJcbk1NTU1NXHROYXJyb3dcdFNcbk1vbnRoIHN0YW5kYWxvbmVcdExcdE51bWVyaWM6IDEgZGlnaXRcdDksIDEyXG5MTFx0TnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZFx0MDksIDEyXG5MTExcdEFiYnJldmlhdGVkXHRTZXBcbkxMTExcdFdpZGVcdFNlcHRlbWJlclxuTExMTExcdE5hcnJvd1x0U1xuV2VlayBvZiB5ZWFyXHR3XHROdW1lcmljOiBtaW5pbXVtIGRpZ2l0c1x0MS4uLiA1M1xud3dcdE51bWVyaWM6IDIgZGlnaXRzICsgemVybyBwYWRkZWRcdDAxLi4uIDUzXG5XZWVrIG9mIG1vbnRoXHRXXHROdW1lcmljOiAxIGRpZ2l0XHQxLi4uIDVcbkRheSBvZiBtb250aFx0ZFx0TnVtZXJpYzogbWluaW11bSBkaWdpdHNcdDFcbmRkXHROdW1lcmljOiAyIGRpZ2l0cyArIHplcm8gcGFkZGVkXHQwMVxuV2VlayBkYXlcdEUsIEVFICYgRUVFXHRBYmJyZXZpYXRlZFx0VHVlXG5FRUVFXHRXaWRlXHRUdWVzZGF5XG5FRUVFRVx0TmFycm93XHRUXG5FRUVFRUVcdFNob3J0XHRUdVxuUGVyaW9kXHRhLCBhYSAmIGFhYVx0QWJicmV2aWF0ZWRcdGFtL3BtIG9yIEFNL1BNXG5hYWFhXHRXaWRlIChmYWxsYmFjayB0byBhIHdoZW4gbWlzc2luZylcdGFudGUgbWVyaWRpZW0vcG9zdCBtZXJpZGllbVxuYWFhYWFcdE5hcnJvd1x0YS9wXG5QZXJpb2QqXHRCLCBCQiAmIEJCQlx0QWJicmV2aWF0ZWRcdG1pZC5cbkJCQkJcdFdpZGVcdGFtLCBwbSwgbWlkbmlnaHQsIG5vb24sIG1vcm5pbmcsIGFmdGVybm9vbiwgZXZlbmluZywgbmlnaHRcbkJCQkJCXHROYXJyb3dcdG1kXG5QZXJpb2Qgc3RhbmRhbG9uZSpcdGIsIGJiICYgYmJiXHRBYmJyZXZpYXRlZFx0bWlkLlxuYmJiYlx0V2lkZVx0YW0sIHBtLCBtaWRuaWdodCwgbm9vbiwgbW9ybmluZywgYWZ0ZXJub29uLCBldmVuaW5nLCBuaWdodFxuYmJiYmJcdE5hcnJvd1x0bWRcbkhvdXIgMS0xMlx0aFx0TnVtZXJpYzogbWluaW11bSBkaWdpdHNcdDEsIDEyXG5oaFx0TnVtZXJpYzogMiBkaWdpdHMgKyB6ZXJvIHBhZGRlZFx0MDEsIDEyXG5Ib3VyIDAtMjNcdEhcdE51bWVyaWM6IG1pbmltdW0gZGlnaXRzXHQwLCAyM1xuSEhcdE51bWVyaWM6IDIgZGlnaXRzICsgemVybyBwYWRkZWRcdDAwLCAyM1xuTWludXRlXHRtXHROdW1lcmljOiBtaW5pbXVtIGRpZ2l0c1x0OCwgNTlcbm1tXHROdW1lcmljOiAyIGRpZ2l0cyArIHplcm8gcGFkZGVkXHQwOCwgNTlcblNlY29uZFx0c1x0TnVtZXJpYzogbWluaW11bSBkaWdpdHNcdDAuLi4gNTlcbnNzXHROdW1lcmljOiAyIGRpZ2l0cyArIHplcm8gcGFkZGVkXHQwMC4uLiA1OVxuRnJhY3Rpb25hbCBzZWNvbmRzXHRTXHROdW1lcmljOiAxIGRpZ2l0XHQwLi4uIDlcblNTXHROdW1lcmljOiAyIGRpZ2l0cyArIHplcm8gcGFkZGVkXHQwMC4uLiA5OVxuU1NTXHROdW1lcmljOiAzIGRpZ2l0cyArIHplcm8gcGFkZGVkICg9IG1pbGxpc2Vjb25kcylcdDAwMC4uLiA5OTlcblpvbmVcdHosIHp6ICYgenp6XHRTaG9ydCBzcGVjaWZpYyBub24gbG9jYXRpb24gZm9ybWF0IChmYWxsYmFjayB0byBPKVx0R01ULThcbnp6enpcdExvbmcgc3BlY2lmaWMgbm9uIGxvY2F0aW9uIGZvcm1hdCAoZmFsbGJhY2sgdG8gT09PTylcdEdNVC0wODowMFxuWiwgWlogJiBaWlpcdElTTzg2MDEgYmFzaWMgZm9ybWF0XHQtMDgwMFxuWlpaWlx0TG9uZyBsb2NhbGl6ZWQgR01UIGZvcm1hdFx0R01ULTg6MDBcblpaWlpaXHRJU084NjAxIGV4dGVuZGVkIGZvcm1hdCArIFogaW5kaWNhdG9yIGZvciBvZmZzZXQgMCAoPSBYWFhYWClcdC0wODowMFxuTywgT08gJiBPT09cdFNob3J0IGxvY2FsaXplZCBHTVQgZm9ybWF0XHRHTVQtOFxuT09PT1x0TG9uZyBsb2NhbGl6ZWQgR01UIGZvcm1hdFx0R01ULTA4OjAwXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1hdFRyYW5zbGF0b3JTZXJ2aWNlIHtcbiAgcHVibGljIHRyYW5zbGF0ZShqYXZhRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBwcmV2ID0gJ1xcMCc7XG4gICAgbGV0IGluUXVvdGUgPSBmYWxzZTtcblxuICAgIGNvbnN0IG1heWJlUHVzaCA9IDxUPih0YXJnZXQ6IFRbXSwgb2JqOiBULCBmbGFnOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgdGFyZ2V0LnB1c2gob2JqKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3QgYyBvZiBqYXZhRm9ybWF0KSB7XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICBpZiAocHJldiA9PT0gJ1xcJycpIHtcbiAgICAgICAgICAgIC8vIGxpdGVyYWwgc2luZ2xlIHF1b3RlIC0gaWdub3JlXG4gICAgICAgICAgICBpblF1b3RlID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluUXVvdGUgPSAhaW5RdW90ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIER1ZSB0byBmb3JtYXR0aW5nIGNvbnN0cmFpbnRzIG9uIHRoZSB3ZWJhcHAsIGFsbCAnZCcgY2hhcmFjdGVycyBzaG91bGQgYmUgcmVwbGFjZWQgd2l0aCAnRCcgKGZvciBNb21lbnQgbGlicmFyeSlcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHdlIHdhbnQgdGhlIGRhdGUsIG5vdCB0aGUgZGF5ICh0aGlzIGZvcm1hdCB3aWxsIG5lZWQgdG8gYmUgY29udmVydGVkIGJhY2spXG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgIG1heWJlUHVzaChyZXN1bHQsICdEJywgaW5RdW90ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIG1vbWVudCBsaWJyYXJ5IGRlZmluZXMgeWVhciBhcyBjYXBpdGFsIHlcbiAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgbWF5YmVQdXNoKHJlc3VsdCwgJ1knLCBpblF1b3RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgIG1heWJlUHVzaChyZXN1bHQsICdFJywgaW5RdW90ZSk7IC8vIG5vIGxvd2VyIGNhc2UgRVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdGJzpcbiAgICAgICAgICBtYXliZVB1c2gocmVzdWx0LCAnVycsIGluUXVvdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdLJzpcbiAgICAgICAgICBtYXliZVB1c2gocmVzdWx0LCAnSCcsIGluUXVvdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdrJzpcbiAgICAgICAgICBtYXliZVB1c2gocmVzdWx0LCAnaCcsIGluUXVvdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBjb21tZW50ZWQgb3V0IEEgY2hhbmdlIHRvICcqKionIGR1ZSB0byB1c2UgaW4gbW9tZW50IGxpYnJhcnkgZm9yIEFNL1BNXG4gICAgICAgIC8vIGFkZGVkICdhJyBzcGVjaWZpY2F0aW9uIHRvIHN0b3AgZGlzY3JlcGFuY3kgaW4gYW0vQU0gcG0vUE0gZm9ybWF0dGluZ1xuICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICBtYXliZVB1c2gocmVzdWx0LCAnQScsIGluUXVvdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgbWF5YmVQdXNoKHJlc3VsdCwgYCoqKiR7Y30qKipgLCBpblF1b3RlKTsgLy8gTm8gd2F5IHRvIHN1cHBvcnQgQSAtIG1pbGxpc2VjIG9mIGRheSwgbiAtIG5hbm8gb2Ygc2Vjb25kLCBOIC0gbmFubyBvZiBEYXlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnVic6XG4gICAgICAgIGNhc2UgJ08nOlxuICAgICAgICAgIG1heWJlUHVzaChyZXN1bHQsICd6JywgaW5RdW90ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICBjYXNlICdYJzpcbiAgICAgICAgICBtYXliZVB1c2gocmVzdWx0LCAnWicsIGluUXVvdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1heWJlUHVzaChyZXN1bHQsIGMsIGluUXVvdGUpO1xuICAgICAgfVxuICAgICAgcHJldiA9IGM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gIH1cblxuICBwdWJsaWMgc2hvd09ubHlEYXRlcyhkYXRlRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIHJlcGxhY2UgJ2QnIGNoYXJhY3RlciB3aXRoICdEJyBmb3IgdGhlIG1vbWVudCBsaWJyYXJ5XG4gICAgLy8gVGhpcyBlbnN1cmVzIG9ubHkgZGF0ZXMgYWxsb3dlZFxuICAgIHdoaWxlIChkYXRlRm9ybWF0LmluY2x1ZGVzKCdkJykpIHtcbiAgICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0LnJlcGxhY2UoJ2QnLCAnRCcpO1xuICAgIH1cbiAgICB3aGlsZSAoZGF0ZUZvcm1hdC5pbmNsdWRlcygneScpKSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC5yZXBsYWNlKCd5JywgJ1knKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVGb3JtYXQ7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlVGltZShkYXRlRm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIHJlbW92ZSBob3VycyBpcnJlbGV2YW50IG9mIHdoZXRoZXIgMTIgb3IgMjQgaG91ciBjbG9ja1xuICAgIHdoaWxlIChkYXRlRm9ybWF0LmluY2x1ZGVzKCdIJykgfHwgZGF0ZUZvcm1hdC5pbmNsdWRlcygnaCcpKSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC5yZXBsYWNlKCdIJywgJycpO1xuICAgICAgZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXQucmVwbGFjZSgnaCcsICcnKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIG1pbnV0ZXNcbiAgICB3aGlsZSAoZGF0ZUZvcm1hdC5pbmNsdWRlcygnbScpKSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC5yZXBsYWNlKCdtJywgJycpO1xuICAgIH1cbiAgICAvLyByZW1vdmUgc2Vjb25kcyAocykgYW5kIG1pY3JvIHNlY29uZHMgKFMpXG4gICAgd2hpbGUgKGRhdGVGb3JtYXQuaW5jbHVkZXMoJ1MnKSB8fCBkYXRlRm9ybWF0LmluY2x1ZGVzKCdzJykpIHtcbiAgICAgIGRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0LnJlcGxhY2UoJ1MnLCAnJyk7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC5yZXBsYWNlKCdzJywgJycpO1xuICAgIH1cbiAgICAvLyBiZWNhdXNlIHRoZXJlIGlzIHRpbWUgcmVtb3ZhbCBhbGdvcml0aG0gY2FuIG1ha2UgcmVhc29uYWJsZSBhc3N1bXB0aW9uIHRvIHJlbW92ZSBjb2xvbnNcbiAgICB3aGlsZSAoZGF0ZUZvcm1hdC5pbmNsdWRlcygnOicpKSB7XG4gICAgICBkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdC5yZXBsYWNlKCc6JywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZUZvcm1hdC50cmltKCk7XG4gIH1cblxuICBwdWJsaWMgaGFzRGF0ZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlKHZhbHVlKS5sZW5ndGggJiZcbiAgICAgIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZCcpID49IDAgJiZcbiAgICAgIHZhbHVlLmluZGV4T2YoJ00nKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigneScpID49IDA7XG4gIH1cblxuICBwdWJsaWMgaXMyNEhvdXIodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZSh2YWx1ZSkubGVuZ3RoICYmXG4gICAgICB2YWx1ZS5pbmRleE9mKCdIJykgPj0gMDtcbiAgfVxuXG4gIHB1YmxpYyBoYXNOb0RheSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlKHZhbHVlKS5sZW5ndGggJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdkJykgPT09IC0xICYmXG4gICAgICB2YWx1ZS5pbmRleE9mKCdNJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3knKSA+PSAwO1xuICB9XG5cbiAgcHVibGljIGhhc05vRGF5QW5kTW9udGgodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZSh2YWx1ZSkubGVuZ3RoICYmXG4gICAgICB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2QnKSA9PT0gLTEgJiZcbiAgICAgIHZhbHVlLmluZGV4T2YoJ00nKSA9PT0gLTEgJiZcbiAgICAgIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigneScpID49IDA7XG4gIH1cblxuICBwdWJsaWMgaGFzSG91cnModmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZSh2YWx1ZSkubGVuZ3RoICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignaCcpID49IDAgJiYgdmFsdWUuaW5kZXhPZignbScpID09PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNNaW51dGVzKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUodmFsdWUpLmxlbmd0aCAmJiB2YWx1ZS5pbmRleE9mKCdtJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2gnKSA+PSAwO1xuICB9XG5cbiAgcHVibGljIGhhc1NlY29uZHModmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZSh2YWx1ZSkubGVuZ3RoICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigncycpID49IDA7XG4gIH1cbn1cbiJdfQ==