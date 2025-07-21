let esc = (sep) => sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = function defineGrammar(dialect, sep) {
  return grammar({
    name: dialect,

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
            (accum, fld) => [
              optional(seq(sep, optional(alias($.field, fld)), ...accum)),
            ],
            [],
          ),
          "\n",
          optional("\r"), // windows line-endings
        ),

      field: ($) =>
        choice(
          new RegExp(`[^${esc(sep)}\\n\\r\"]+`),
          seq('"', repeat(choice(/[^"]/, '""')), '"'),
        ),
    },
  });
};
