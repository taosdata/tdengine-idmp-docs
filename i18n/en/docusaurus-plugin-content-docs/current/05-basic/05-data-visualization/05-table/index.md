# Table

Tables are used to display data directly.

## Configuration

### Graph Configuration

#### Timestamp Format

Configure the timestamp formatting string, with the rules as follows.

| format   | example   | description                                        |
|--------|---------|--------------------------------------------|
|YY  | 01 |Two-digit year    |
|YYYY| 2001 |Four-digit year|
|M   | 1-12 |Month, beginning at 1|
|MM  |  01-12 |Month, 2-digits|
|MMM |   Jan-Dec | The abbreviated month name|
|MMMM| January-December | The full month name|
|D   | 1-31 |Day of month|
|DD  |  01-31 |Day of month, 2-digits|
|H   | 0-23 |Hours|
|HH  |  00-23 |Hours, 2-digits|
|h   | 1-12 |Hours, 12-hour clock|
|hh  |  01-12 |Hours, 12-hour clock, 2-digits|
|m   | 0-59 |Minutes|
|mm  |  00-59 |Minutes, 2-digits|
|s   | 0-59 |Seconds|
|ss  |  00-59 |Seconds, 2-digits|
|S   | 0-9  | Hundreds of milliseconds, 1-digit|
|SS  |  00-99 |Tens of milliseconds, 2-digits|
|SSS |   000-999 | Milliseconds, 3-digits|
|Z   | -05:00 | Offset from UTC|
|ZZ  |  -0500 | Compact offset from UTC, 2-digits|
|A   | AM PM | Post or ante meridiem, upper-case|
|a   | am pm | Post or ante meridiem, lower-case|
|Do  |  1st... 31st | Day of Month with ordinal|
|X   | 1410715640.579 | Unix timestamp|
|x   | 1410715640579 | Unix ms timestamp|

## Roadmap

To continuously enhance your user experience, we will keep adding practical configurations in subsequent product updates, allowing you to enjoy richer and more user-friendly analysis features.

| Configuration  | Description                                              |
|------------|-------------------------------------------------------------|
| Statistical Row  | You can append a statistical row to display metrics such as the maximum value, minimum value, and average value of a specific indicator.   |
| Value Format  | Format the numerical values |
