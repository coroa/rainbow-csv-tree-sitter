let sep = ",";
module.exports = grammar({
  name: "csv",

  rules: {
    csv: ($) => repeat($.row),
    row: ($) => seq(repeat(seq($._cycle7, sep)), $._remainder),

    _cycle7: ($) =>
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

    _remainder: ($) =>
      seq(
        optional(alias($.field, $.first)),
        ...[$.seventh, $.sixth, $.fifth, $.fourth, $.third, $.second].reduce(
          (accum, fld) => [optional(seq(sep, optional(alias($.field, fld)), ...accum))],
          [],
        ),
        "\n",
      ),

    field: ($) =>
      choice(
        new RegExp(`[^${sep}\\n\\r\"]+`),
        seq('"', repeat(choice(/[^"]/, '""')), '"'),
      ),
  },
});
