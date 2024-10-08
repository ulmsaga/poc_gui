package com.mobigen.cdev.poc.core.file.excel.handler;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.excel.module.ExcelSXSSF;
import com.mobigen.cdev.poc.core.util.common.Cutil;
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;

import java.util.Map;

@SuppressWarnings({"rawtypes"})
public class ExcelDefaultExceptionHandler implements ResultHandler {
    private final ExcelSXSSF xls = new ExcelSXSSF();
    private int rows = 0;
    private boolean moreTandMaxRow = false;

    public ExcelDefaultExceptionHandler(Map<String, Object> param) {
        try {
            xls.createXlsxFile(param);
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public void handleResult(ResultContext resultContext) {
        rows++;
        if (rows > Cutil.MAX_EXCEL_ROW) {
            if (!this.moreTandMaxRow) this.moreTandMaxRow = true;
        } else {
            Map<String, String> resultMap = (Map<String, String>) resultContext.getResultObject();
            xls.insertRowByContext(resultMap);
        }
    }

    public String execute() {
        String ret;
        try {
            xls.fileClose();
            ret = xls.writeXlsxFile();
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
        return ret;
    }

    public int getRows() {
        return rows;
    }

    public boolean isMoreThanMaxRow() {
        return moreTandMaxRow;
    }
}
