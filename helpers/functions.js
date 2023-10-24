function replacePlaceholders(template, data) {
  let rates = '';
  data.exchange_rates.forEach(rate => {
    rates += `${template
      .replace('{%baseCurrency%}', rate.base_currency)
      .replace('{%targetCurrency%}', rate.target_currency)
      .replace('{%amount%}', rate.exchange_rate)
      .replace('{%date%}', rate.date)}`;
  });
  return rates;
}

function replaceHome(template, replace) {
  return template.replace('{%exchange_rates%}', replace);
}

module.exports = { replacePlaceholders, replaceHome };
