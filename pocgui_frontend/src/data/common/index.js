
const periodList = [
  { value: '1M', label: '1M'}
];

const callTypeList = [
  { key: 'ATTACH', value: 'ATTACH', label: 'ATTACH', code: '1'},
  { key: 'SRMO', value: 'SRMO', label: 'SRMO', code: '3'},
  { key: 'SRMT', value: 'SRMT', label: 'SRMT', code: '4'},
  { key: 'TAU', value: 'TAU', label: 'TAU', code: '5'},
  { key: 'PAGING', value: 'PAGING', label: 'PAGING', code: '6'},
  { key: 'ESRMO', value: 'ESRMO', label: 'ESRMO', code: '7'},
  { key: 'ESRMT', value: 'ESRMT', label: 'ESRMT', code: '8'},
];

const nodeTypeList = [
  { value : 'MME', label: 'MME', node: 'MME', linkTypeList: [{ value: '-', label: '-', node: '-' }] },
  { value: 'ENB', label: 'ENB', node: 'ENB', linkTypeList: [{ value: '-', label: '-', node: '-' }, { value: 'MME', label: 'S1-MME', node: 'MME' }] }
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

const NODE_TYPE_PATTERN_EPC = 'EPC';
const NODE_TYPE_PATTERN_ENB = 'ENB';

export { periodList, callTypeList, nodeTypeList, mmeList, enbList, NODE_TYPE_PATTERN_ENB, NODE_TYPE_PATTERN_EPC }