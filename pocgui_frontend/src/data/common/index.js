
const periodList = [
  { value: '1M', label: '1M'}
];

const callTypeList = [
  { key: 'ATTACH', value: 'ATTACH', label: 'ATTACH'},
  { key: 'SRMO', value: 'SRMO', label: 'SRMO'},
  { key: 'SRMT', value: 'SRMT', label: 'SRMT'},
  { key: 'TAU', value: 'TAU', label: 'TAU'},
  { key: 'PAGING', value: 'PAGING', label: 'PAGING'},
  { key: 'ESRMO', value: 'ESRMO', label: 'ESRMO'},
  { key: 'ESRMT', value: 'ESRMT', label: 'ESRMT'}
];

const nodeTypeList = [
  { value : 'MME', label: 'MME', node: 'MME', linkTypeList: [{ value: '-', label: '-', node: '-' }] },
  { value: 'ENB', label: 'ENB', node: 'ENB', linkTypeList: [{ value: '-', label: '-', node: '-' }, { value: 'S1-MME', label: 'S1-MME', node: 'MME' }] }
];

const mmeList = [
  { value: '0004', label: 'MME#04', mtso_id: '11', mtso_name: '보라매', mtso_desc: '보라매(11)' },
  { value: '0005', label: 'MME#05', mtso_id: '11', mtso_name: '보라매', mtso_desc: '보라매(11)' },
  { value: '0006', label: 'MME#06', mtso_id: '11', mtso_name: '보라매', mtso_desc: '보라매(11)' },
  { value: '0007', label: 'MME#07', mtso_id: '11', mtso_name: '보라매', mtso_desc: '보라매(11)' },
  { value: '0051', label: 'MME#51', mtso_id: '7', mtso_name: '둔산', mtso_desc: '둔산(7)' },
  { value: '0052', label: 'MME#52', mtso_id: '7', mtso_name: '둔산', mtso_desc: '둔산(7)' },
];

const enbList = [];

export { periodList, callTypeList, nodeTypeList, mmeList, enbList }