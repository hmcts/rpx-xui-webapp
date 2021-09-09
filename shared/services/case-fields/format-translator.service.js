"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var FormatTranslatorService = /** @class */ (function () {
    function FormatTranslatorService() {
    }
    FormatTranslatorService.prototype.translate = function (javaFormat) {
        var result = [];
        var prev = '\0';
        var inQuote = false;
        var maybePush = function (target, obj, flag) {
            if (!flag) {
                target.push(obj);
            }
        };
        for (var _i = 0, javaFormat_1 = javaFormat; _i < javaFormat_1.length; _i++) {
            var c = javaFormat_1[_i];
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
                    maybePush(result, '***' + c + '***', inQuote); // No way to support A - millisec of day, n - nano of second, N - nano of Day
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
    };
    FormatTranslatorService.prototype.showOnlyDates = function (dateFormat) {
        // replace 'd' character with 'D' for the moment library
        // This ensures only dates allowed
        while (dateFormat.includes('d')) {
            dateFormat = dateFormat.replace('d', 'D');
        }
        return dateFormat;
    };
    FormatTranslatorService.prototype.removeTime = function (dateFormat) {
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
    };
    FormatTranslatorService.prototype.hasDate = function (value) {
        return this.translate(value).length &&
            value.toLowerCase().indexOf('d') >= 0 &&
            value.indexOf('M') >= 0 && value.toLowerCase().indexOf('y') >= 0;
    };
    FormatTranslatorService.prototype.is24Hour = function (value) {
        return this.translate(value).length &&
            value.indexOf('H') >= 0;
    };
    FormatTranslatorService.prototype.hasNoDay = function (value) {
        return this.translate(value).length && value.toLowerCase().indexOf('d') === -1 &&
            value.indexOf('M') >= 0 && value.toLowerCase().indexOf('y') >= 0;
    };
    FormatTranslatorService.prototype.hasNoDayAndMonth = function (value) {
        return this.translate(value).length &&
            value.toLowerCase().indexOf('d') === -1 &&
            value.indexOf('M') === -1 &&
            value.toLowerCase().indexOf('y') >= 0;
    };
    FormatTranslatorService.prototype.hasHours = function (value) {
        return this.translate(value).length && value.toLowerCase().indexOf('h') >= 0 && value.indexOf('m') === -1;
    };
    FormatTranslatorService.prototype.hasMinutes = function (value) {
        return this.translate(value).length && value.indexOf('m') >= 0 && value.toLowerCase().indexOf('h') >= 0;
    };
    FormatTranslatorService.prototype.hasSeconds = function (value) {
        return this.translate(value).length && value.toLowerCase().indexOf('s') >= 0;
    };
    FormatTranslatorService = __decorate([
        core_1.Injectable()
    ], FormatTranslatorService);
    return FormatTranslatorService;
}());
exports.FormatTranslatorService = FormatTranslatorService;
//# sourceMappingURL=format-translator.service.js.map