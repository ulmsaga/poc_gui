import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-community/styles/ag-theme-balham.min.css'
import 'styles/ag-grid.css';
import { ContextMenu } from "./ContextMenu";
import CopyToClipboard from "react-copy-to-clipboard";
import { AgGridReact } from "ag-grid-react";

function GridMain ({rowData, columnDefs, defaultColDef, style, className, rowSelection, getSelectedData, suppressRowClickSelection, isRowSelectable, getGridCurrApi, onCellDoubleClicked, onCellClicked, onCellValueChanged, onRowValueChanged, editType, stopEditingWhenCellsLoseFocus, useContextMenu }) {
  const gridSimpleRef = useRef();
  const gridRef = useRef();
  const initDefaultColDef = useMemo(() => ({
      resizable: true,
      sortable: true
  }), []);
  useEffect(() => {
    const renderAutoSizeColumns = () => {
      if (gridRef.current.columnApi === undefined) return;
      if (rowData === undefined || rowData.length === 0) return;
      const allColumnIds = [];
      gridRef.current.columnApi.getColumns().forEach((column) => {
        let suppressSizeToFit = false;
        if (column.colDef.suppressSizeToFit !== undefined) {
          suppressSizeToFit = column.colDef.suppressSizeToFit
        }
        if (!suppressSizeToFit) allColumnIds.push(column);
      });
      gridRef.current.columnApi.autoSizeColumns(allColumnIds, true);
    }
    setTimeout(() => {
      renderAutoSizeColumns();
    }, 100);
  }, [rowData]);
  const onGridReady = useCallback(() => {
    if (getGridCurrApi === undefined) return;
    getGridCurrApi(gridRef.current.api);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSelectionChanged = useCallback(() => {
    getSelectedData(gridRef.current.api.getSelectedRows());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const selectedCellRef = useRef({});
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const onCellContextMenu = (e) => {
    if (!useContextMenu) return;
    if (e.rowIndex === undefined || e?.rowIndex < 0 || e.value === undefined || e?.value === "") return;
    setClicked(true);
    setPoints({ x: e.event.pageX - gridSimpleRef.current?.getBoundingClientRect()?.left, y: e.event.pageY - gridSimpleRef.current?.getBoundingClientRect()?.top });
    selectedCellRef.current = e;
  };

  const onContextMenuCopyClick = (e) => { // eslint-disable-line no-unused-vars
    const targetTxt = selectedCellRef.current.value;
    window.navigator.clipboard.writeText(targetTxt)
      .then(() => {}, () => {
        const txt = document.createElement("textarea");
        document.body.appendChild(txt);
        txt.value = targetTxt;
        let sel = getSelection();
        let range = document.createRange();
        range.selectNode(txt);
        sel.removeAllRanges();
        sel.addRange(range);
        if (document.execCommand("copy")) {
          console.log("execCommand copy success");
        }
        document.body.removeChild(txt);
      });
  };

  return (
    <div ref = { gridSimpleRef } className={className} style={style} onContextMenu={(e) => { if (useContextMenu) { e.preventDefault(); } }}>
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            {/* 셀 복사 */}
            <CopyToClipboard text = { selectedCellRef.current.value } ><li>셀 복사</li></CopyToClipboard>
          </ul>
        </ContextMenu>
      )}
      <AgGridReact
        ref = { gridRef }
        rowData = { rowData }
        columnDefs = { columnDefs }
        rowSelection = { rowSelection }
        defaultColDef = { defaultColDef === undefined ? initDefaultColDef : defaultColDef }
        onGridReady = { onGridReady }
        onSelectionChanged = { onSelectionChanged }
        suppressRowClickSelection = { suppressRowClickSelection }
        // isRowSelectable : 선택 CheckBox가 있을때만 true로 할것. 아니면 오류 발생
        isRowSelectable = { isRowSelectable }
        onCellDoubleClicked = { onCellDoubleClicked }
        onCellValueChanged = { onCellValueChanged }
        onRowValueChanged = { onRowValueChanged }
        editType={ editType }
        stopEditingWhenCellsLoseFocus = { stopEditingWhenCellsLoseFocus }
        onCellContextMenu={ onCellContextMenu }
        onCellClicked={ onCellClicked }
        enableBrowserTooltips = { true }
      />
    </div>
  )
}

// GridMain.defaultProps = {
//   className: 'ag-theme-balham-dark',
//   style: {height: 600, width: '100%'},
//   rowSelection: 'multiple',
//   suppressRowClickSelection: false,
//   isRowSelectable: false,
//   getGridCurrApi: () => {},
//   getSelectedData: () => {},
//   onCellDoubleClicked: () => {},
//   stopEditingWhenCellsLoseFocus: false,
//   useContextMenu: false
// }

export default GridMain