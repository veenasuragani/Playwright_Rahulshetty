function groupBy(arr, status) {
    return arr.reduce((groups, item) =>{
        const group =item[status];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;

    }, {})
}

const tests = [
  { name: 'Login test',   status: 'pass' },
  { name: 'Signup test',  status: 'fail' },
  { name: 'Search test',  status: 'pass' },
  { name: 'Logout test',  status: 'fail' },
];

console.log(groupBy(tests, 'status')); 

/*{
  pass: [
    { name: 'Login test', status: 'pass' },
    { name: 'Search test', status: 'pass' }
  ],
  fail: [
    { name: 'Signup test', status: 'fail' },
    { name: 'Logout test', status: 'fail' }
  ]
}*/