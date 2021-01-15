/* Enumeration of possible date formats for IsDate decorator
 */
export enum DateFormat {
    // the date-time notation as defined by RFC 3339, section 5.6, for example, 2017-07-21T17:32:28Z
    DATE_TIME = 'date-time',

    // full-date notation as defined by RFC 3339, section 5.6, for example, 2017-07-21
    DATE = 'date',
}
