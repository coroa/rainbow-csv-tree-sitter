let sep = ",";
module.exports = grammar({
  name: "csv",

  rules: {
    csv: ($) => seq(repeat(seq($.row, "\n")), optional($.row)),
    row: ($) => seq(repeat(seq($.cycle7, sep)), $.remainder),

    cycle7: ($) =>
      seq(
        optional(alias($.field, $.first)),
        sep,
        optional(alias($.field, $.second)),
        sep,
        optional(alias($.field, $.third)),
        sep,
        optional(alias($.field, $.fourth)),
        sep,
        optional(alias($.field, $.fifth)),
        sep,
        optional(alias($.field, $.sixth)),
        sep,
        optional(alias($.field, $.seventh)),
      ),

    remainder: ($) =>
      seq(
        alias($.field, $.first),
        ...[$.seventh, $.sixth, $.fifth, $.fourth, $.third, $.second].reduce(
          (accum, fld) => [
            optional(seq(sep, optional(alias($.field, fld)), ...accum)),
          ],
          [],
        ),
      ),

    field: ($) =>
      choice(
        new RegExp(`[^${sep}\\n\\r\"]+`),
        seq('"', repeat(choice(/[^"]/, '""')), '"'),
      ),
  },
});
