export const datePatchTypes = [
  {
    name: 'today',
    subtractType: 'days',
    start: 0,
    end: 0,
    colorCode: 'primary',
  },
  {
    name: 'yesterday',
    subtractType: 'days',
    start: 1,
    end: 1,
    colorCode: 'success',
  },
  {
    name: 'last 7 days',
    subtractType: 'days',
    start: 7,
    end: 0,
    colorCode: 'info',
  },
  {
    name: 'this month',
    subtractType: 'month',
    start: 0,
    end: 0,
    colorCode: 'secondary',
  },
  {
    name: 'last month',
    subtractType: 'month',
    start: 1,
    end: 1,
    colorCode: 'danger',
  },
];
