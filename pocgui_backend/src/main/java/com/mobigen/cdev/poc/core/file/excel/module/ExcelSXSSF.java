package com.mobigen.cdev.poc.core.file.excel.module;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.util.common.BeanUtils;
import com.mobigen.cdev.poc.core.util.common.Cutil;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

import java.io.*;
import java.sql.Clob;
import java.text.NumberFormat;
import java.util.*;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

@SuppressWarnings("all")
public class ExcelSXSSF {

    //=====================================
    private final SXSSFWorkbook wb;
    private final Map<String, File> sheetMap;
    private final Map<String, List<String[]>> headerArrayMap;
    private final Map<String, List<String[]>> mergeArrayMap;
    private final Map<String, CellStyle> cellStyle;
    private final Map<String, String> name2SheetMap;
    private final String sheetPartName = "xl/worksheets/sheet";
    private final String sheetPartExt = ".xml";
    private final int WORKBOOK_MEM_SIZE = 1000;
    //=====================================

    //=====================================
    private String[] arrayColumnId;
    private int headerRowCount = 0;
    private int rownum = 0;
    private final List<Integer> numberIdList = new ArrayList<>();
    //=====================================

    //=====================================
    private Writer _out = null;
    private int _rownum = 0;
    private final String xmlEncoding = "UTF-8";
    private String _merge = "";
    //=====================================

    private Environment env;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @SuppressWarnings("Convert2Diamond")
    public ExcelSXSSF() {
        this.env = BeanUtils.getEnv();

        wb = new SXSSFWorkbook(WORKBOOK_MEM_SIZE);

        cellStyle = new HashMap<String, CellStyle>();

        Font xssfFontHeader = wb.createFont();
        CellStyle xssfCellStyleHeader = wb.createCellStyle();

        xssfFontHeader.setBold(false);
        xssfFontHeader.setFontHeight((short) 200);
        xssfFontHeader.setFontName("뫼비우스 Regular");

        xssfCellStyleHeader.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyleHeader.setVerticalAlignment(VerticalAlignment.CENTER);
        xssfCellStyleHeader.setFillForegroundColor(HSSFColor.HSSFColorPredefined.PALE_BLUE.getIndex());
        xssfCellStyleHeader.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        xssfCellStyleHeader.setBorderBottom(BorderStyle.THIN);
        xssfCellStyleHeader.setBorderLeft(BorderStyle.THIN);
        xssfCellStyleHeader.setBorderRight(BorderStyle.THIN);
        xssfCellStyleHeader.setBorderTop(BorderStyle.THIN);
        xssfCellStyleHeader.setFont(xssfFontHeader);

        cellStyle.put("header", xssfCellStyleHeader);


        Font xssfFontData = wb.createFont();
        CellStyle xssfCellStyleData = wb.createCellStyle();

        xssfFontData.setBold(false);
        xssfFontData.setFontHeight((short) 200);
        xssfFontData.setFontName("뫼비우스 Regular");

        xssfCellStyleData.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyleData.setVerticalAlignment(VerticalAlignment.CENTER);
        xssfCellStyleData.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        xssfCellStyleData.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        xssfCellStyleData.setBorderBottom(BorderStyle.THIN);
        xssfCellStyleData.setBorderLeft(BorderStyle.THIN);
        xssfCellStyleData.setBorderRight(BorderStyle.THIN);
        xssfCellStyleData.setBorderTop(BorderStyle.THIN);
        xssfCellStyleData.setFont(xssfFontData);

        cellStyle.put("data", xssfCellStyleData);

        xssfCellStyleData.setDataFormat(wb.createDataFormat().getFormat("@"));
        cellStyle.put("text", xssfCellStyleData);

        Font xssfFontSum = wb.createFont();
        CellStyle xssfCellStyleSum = wb.createCellStyle();
        short xssfDataFormat = wb.createDataFormat().getFormat("#,##0");

        xssfFontSum.setBold(false);
        xssfFontSum.setFontHeight((short) 200);
        xssfFontSum.setFontName("뫼비우스 Regular");

        xssfCellStyleSum.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyleSum.setVerticalAlignment(VerticalAlignment.CENTER);
        xssfCellStyleSum.setFillForegroundColor(HSSFColor.HSSFColorPredefined.LAVENDER.getIndex());
        xssfCellStyleSum.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        xssfCellStyleSum.setBorderBottom(BorderStyle.THIN);
        xssfCellStyleSum.setBorderLeft(BorderStyle.THIN);
        xssfCellStyleSum.setBorderRight(BorderStyle.THIN);
        xssfCellStyleSum.setBorderTop(BorderStyle.THIN);
        xssfCellStyleSum.setDataFormat(xssfDataFormat);
        xssfCellStyleSum.setFont(xssfFontSum);

        cellStyle.put("sum", xssfCellStyleSum);


        Font xssfFontNumber = wb.createFont();
        CellStyle xssfCellStyleNumber = wb.createCellStyle();
        xssfDataFormat = wb.createDataFormat().getFormat("#,##0");

        xssfFontNumber.setBold(false);
        xssfFontNumber.setFontHeight((short) 200);
        xssfFontNumber.setFontName("뫼비우스 Regular");

        xssfCellStyleNumber.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyleNumber.setVerticalAlignment(VerticalAlignment.CENTER);
        xssfCellStyleNumber.setFillForegroundColor(HSSFColor.HSSFColorPredefined.LAVENDER.getIndex());
        xssfCellStyleNumber.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        xssfCellStyleNumber.setBorderBottom(BorderStyle.THIN);
        xssfCellStyleNumber.setBorderLeft(BorderStyle.THIN);
        xssfCellStyleNumber.setBorderRight(BorderStyle.THIN);
        xssfCellStyleNumber.setBorderTop(BorderStyle.THIN);
        xssfCellStyleNumber.setDataFormat(xssfDataFormat);
        xssfCellStyleNumber.setFont(xssfFontNumber);

        cellStyle.put("number", xssfCellStyleNumber);


        Font xssfFontPercent = wb.createFont();
        CellStyle xssfCellStylePercent = wb.createCellStyle();
        xssfDataFormat = wb.createDataFormat().getFormat("0.00%");

        xssfFontPercent.setBold(false);
        xssfFontPercent.setFontHeight((short) 200);
        xssfFontPercent.setFontName("뫼비우스 Regular");

        xssfCellStylePercent.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStylePercent.setVerticalAlignment(VerticalAlignment.CENTER);
        xssfCellStylePercent.setFillForegroundColor(HSSFColor.HSSFColorPredefined.LAVENDER.getIndex());
        xssfCellStylePercent.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        xssfCellStylePercent.setBorderBottom(BorderStyle.THIN);
        xssfCellStylePercent.setBorderLeft(BorderStyle.THIN);
        xssfCellStylePercent.setBorderRight(BorderStyle.THIN);
        xssfCellStylePercent.setBorderTop(BorderStyle.THIN);
        xssfCellStylePercent.setDataFormat(xssfDataFormat);
        xssfCellStylePercent.setFont(xssfFontPercent);

        cellStyle.put("percent", xssfCellStylePercent);

        this.sheetMap = new HashMap<String, File>();
        this.headerArrayMap = new HashMap<String, List<String[]>>();
        this.mergeArrayMap = new HashMap<String, List<String[]>>();
        this.name2SheetMap = new HashMap<String, String>();
    }

    private Sheet createSheet(String sheetName) {
        Sheet xssfSheet = null;
        String tempSheetName = null;

        if("".equals(sheetName) || sheetName == null) {
            xssfSheet = wb.createSheet();
        } else  {
            xssfSheet = wb.createSheet(sheetName);
        }

        tempSheetName = xssfSheet.getSheetName();

        File file = null;
        try {
            String xmlTempPath = env.getProperty("file.path.create.excel");

            File tempDir = new File(xmlTempPath);

            file = File.createTempFile(tempSheetName,  ".xml", tempDir);
            if (!file.setWritable(true, true)){
                logger.warn("쓰기권한 오류");
            }
            if (!file.setReadable(true, true)){
                logger.warn("읽기권한 오류");
            }
            if (!file.setExecutable(false)){
                logger.warn("실행권한 오류");
            }

        } catch (IOException ioe) {
            throw new RsRuntimeException("error.common.io");
        }
        String xmlName = sheetPartName + (name2SheetMap.size() + 1) + sheetPartExt;
        name2SheetMap.put(tempSheetName, xmlName);
        sheetMap.put(xmlName, file);

        return xssfSheet;
    }

    private void setHeader(String sheetName, String[][] header) {
        for(int i = 0; i < header.length; i++) {
            if(headerArrayMap.get(sheetName) == null) {
                headerArrayMap.put(sheetName, new ArrayList<String[]>());
            }
            headerArrayMap.get(sheetName).add(i, header[i]);
        }
    }

    private void setMergeCell(String sheetName, String[] position) {
        if(mergeArrayMap.get(sheetName) == null) {
            mergeArrayMap.put(sheetName, new ArrayList<String[]>());
        }

        mergeArrayMap.get(sheetName).add(position);
    }

    @SuppressWarnings("unchecked")
    public void createXlsxFile(Map<String, Object> paramMap) throws Exception {
        String fileName;
        String sheetName;

        paramMap = getHeaderInfo(paramMap);

        List<String[]> titleL=(List<String[]>)paramMap.get("titleName");
        String[][] title={};
        for(int i=0;i<titleL.size();i++){
            String[] tmp=(String[])titleL.get(i);
            title=(String[][]) ArrayUtils.add(title, tmp);
        }

        //String[][][] titleName={{titleL.get(0), titleL.get(1), titleL.get(2)}};
        String[][][] titleName={title};
        String[][]      mergeCell = {(String[]) paramMap.get("mergeCell")};
        String[][]      columnId = {(String[]) paramMap.get("columnId")};
        String[][]      colWidth = {(String[]) paramMap.get("colWidth")};

        fileName = (String) paramMap.get("fileName");
        sheetName = (String) paramMap.get("sheetName");

        // 시트명이 없으면 파일명으로 대체.
        if(sheetName == null || "".equals(sheetName)) {
            sheetName = fileName;
        }
        createXlsxFile(sheetName, titleName, mergeCell, columnId, colWidth, paramMap);
    }

    public void createXlsxFile(String sheetName, String[][][] arrayTitleHeader, String[][] arrayMergeCell, String[][] arrayColumnId, String[][] arrayColWidth, Map<String, Object> paramMap) throws Exception {
        Sheet sheet = createSheet(sheetName);
        sheetName = sheet.getSheetName();
        try {
            setHeader(sheetName, arrayTitleHeader[0]);
            setMergeCell(sheetName, arrayMergeCell[0]);

            _out = new OutputStreamWriter(new FileOutputStream(sheetMap.get(name2SheetMap.get(sheetName))), "UTF-8");

            this.rownum = 0;
            this.arrayColumnId = arrayColumnId[0];
            this.headerRowCount = Integer.parseInt(paramMap.get("maxHeaderRow").toString());
            beginSheet(arrayColWidth[0]);
            mergeCell(mergeArrayMap.get(sheetName));
            addTitleRow(cellStyle.get("header"), headerArrayMap.get(sheetName));
        } catch(Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }


    public void beginSheet() throws IOException {
        _out.write("<?xml version=\"1.0\" encoding=\"" + xmlEncoding + "\"?>"
                + "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\">");
        _out.write("<sheetData>\n");

    }

    public void beginSheet(String[] arrayColWidth) throws IOException {
        _out.write("<?xml version=\"1.0\" encoding=\"" + xmlEncoding + "\"?>"
                + "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\">");

        if(arrayColWidth != null) {
            _out.write("<cols>\n");

            for(int i = 0; i < arrayColWidth.length; i++) {
                if(i < arrayColWidth.length - 1 && arrayColWidth[i].equals(arrayColWidth[i+1])) {
                    continue;
                }
            }
            _out.write("</cols>\n");
        }
        _out.write("<sheetData>\n");
    }

    public void endSheet() throws  IOException {
        _out.write("</sheetData>");
        if(_merge != null) {
            _out.write(_merge);
        }
        _out.write("</worksheet>");
    }

    public void insertRow(int rownum) throws IOException {
        _out.write("<row r=\"" + (rownum + 1) + "\">\n");
        this._rownum = rownum;
    }

    public void endRow() throws IOException {
        _out.write("</row>\n");
    }

    public void createCell(int columnIndex, String value, int styleIndex) throws IOException {
        String ref = new CellReference(_rownum, columnIndex).formatAsString();

        ref = ref.replaceAll("\\$",  "");

        if(value == null) {
            value = "";
        }

        _out.write("<c r=\"" + ref + "\" t=\"inlineStr\"");
        if(styleIndex != -1) {
            _out.write(" s=\"" + styleIndex + "\"");
        }

        _out.write(">");
        _out.write("<is><t><![CDATA[" + value + "]]></t></is>");
        _out.write("</c>");
    }

    public void createCell(int columnIndex, String value)  throws IOException {
        createCell(columnIndex, value,  -1);
    }

    public void createCell(int columnIndex, double value, int styleIndex)  throws IOException {
        String ref = new CellReference(_rownum, columnIndex).formatAsString();

        ref = ref.replaceAll("\\$",  "");

        _out.write("<c r=\"" + ref + "\" t=\"n\"");
        if(styleIndex != -1) {
            _out.write(" s=\"" + styleIndex + "\"");
        }

        NumberFormat f = NumberFormat.getInstance();
        f.setGroupingUsed(false);

        _out.write(">");
        _out.write("<v><![CDATA[" + value + "]]></v>");
        _out.write("</c>");
    }

    public void createCell(int columnIndex, double value)  throws IOException {
        createCell(columnIndex, value,  -1);
    }

    public void createCell(int columnIndex, Calendar value, int styleIndex)  throws IOException {
        createCell(columnIndex, DateUtil.getExcelDate(value, false),  styleIndex);
    }

    public void createCell(int columnIndex, Calendar value)  throws IOException {
        createCell(columnIndex, DateUtil.getExcelDate(value, false),  -1);
    }

    public void mergeCell(List<String[]> mergeList) throws IOException {
        StringBuffer buf = new StringBuffer();

        if(mergeList == null || mergeList.get(0) == null) {
            return;
        }

        buf.append("<mergeCells>");
        for(int i = 0; i < mergeList.size(); i++) {
            for(int j = 0; j < mergeList.get(i).length; j++) {
                String[] arrayMergeCell = mergeList.get(i)[j].split(":", -1);
                buf.append("<mergeCell ref=\"" + arrayMergeCell[0] + ":" + arrayMergeCell[1] + "\"/>");
            }
        }
        buf.append("</mergeCells>");

        _merge=buf.toString();
    }

    public void addTitleRow(CellStyle xssfCellStyle, List<String[]> headerList) throws Exception, IOException {
        try {
            for(int i = 0; i < headerList.size(); i++) {
                String[] titleHeader = headerList.get(i);

                insertRow(i);
                for(int j = 0; j < titleHeader.length; j++) {
                    createCell(j,  titleHeader[j], xssfCellStyle.getIndex());
                }
                endRow();
            }
        } catch (IOException ioe) {
            throw new RsRuntimeException("error.common.io");
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }
    public void addTitleRowTopInfo(XSSFCellStyle xssfCellStyle, List<String[]> headerList, String[] topInfoHeader, String[] topInfoData) throws Exception, IOException {
        try {
            insertRow(0);
            for(int j = 0; j < topInfoHeader.length; j++) {
                createCell(j,  topInfoHeader[j], xssfCellStyle.getIndex());
            }
            endRow();
            insertRow(1);
            for(int j = 0; j < topInfoData.length; j++) {
                createCell(j,  topInfoData[j]);
            }
            endRow();
            for(int i = 0; i < headerList.size(); i++) {
                String[] titleHeader = headerList.get(i);
                insertRow(i+2);
                for(int j = 0; j < titleHeader.length; j++) {
                    createCell(j,  titleHeader[j], xssfCellStyle.getIndex());
                }
                endRow();
            }
        } catch (IOException ioe) {
            throw new RsRuntimeException("error.common.io");
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }

    public void insertRowByContext(Map<String, String> map){
        try {
            insertRow(this.headerRowCount+rownum);
            boolean isNumer = false;
            double d = 0;
            String s = "";
            for(int i = 0; i < arrayColumnId.length; i++) {
                s = "";
                Object tempData = map.get(arrayColumnId[i]);
                if (tempData == null) tempData = map.get(arrayColumnId[i].toLowerCase());
                if (tempData instanceof java.sql.Clob) {
                    StringBuffer sb = new StringBuffer();
                    Clob clob = (java.sql.Clob) tempData;
                    BufferedReader br = new BufferedReader(clob.getCharacterStream());
                    while ((s = br.readLine()) != null) {
                        sb.append(s);
                    }
                    s = sb.toString();
                } else {
                    s = String.valueOf(tempData);
                }

                if(tempData == null) {
                    s = "";
                }

                if (s != null) {
                    s = s.replaceAll(",", "");
                }

                if(s == null || numberIdList == null) {
                    createCell(i, "", cellStyle.get("data").getIndex());
                } else if(numberIdList.contains(i)) {
                    createCell(i, Double.valueOf(s), cellStyle.get("number").getIndex());
                } else if(s.replaceAll(" ", "").contains("총계") || s.replaceAll(" ", "").contains("합계") || s.replaceAll(" ", "").contains("소계")) {
                    createCell(i, s, cellStyle.get("sum").getIndex());
                } else if(s.equals("")) {
                    createCell(i, s, cellStyle.get("data").getIndex());
                } else {
                    if ("0".equals(s.substring(0, 1)) && (s.length() == 2 || s.length() == 3 || s.length() == 10 || s.length() == 11 || s.length() == 4)) {
                        if (!"0.".equals(s.substring(0, 2))) {
                            // MDN (LEN 10, 11), PLMN MNC(LEN 2, 3), EPC ID(LEN 4)
                            createCell(i, " " + s, cellStyle.get("text").getIndex());
                        } else {
                            //
                            if (Cutil.isNumeric(s) == true) {
                                d = Double.valueOf(s);
                                createCell(i, d, cellStyle.get("data").getIndex());
                            } else {
                                isNumer = Pattern.matches("^[-+]?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][-+]?[0-9]+)?$", s.trim().toUpperCase());
                                if (isNumer) {
                                    d = Double.valueOf(s);
                                    createCell(i, d, cellStyle.get("data").getIndex());
                                } else {
                                    createCell(i, s, cellStyle.get("data").getIndex());
                                }
                            }
                        }
                    } else {
                        //
                        if (Cutil.isNumeric(s) == true) {
                            d = Double.valueOf(s);
                            createCell(i, d, cellStyle.get("data").getIndex());
                        } else {
                            isNumer = Pattern.matches("^[-+]?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][-+]?[0-9]+)?$", s.trim().toUpperCase());
                            if (isNumer) {
                                d = Double.valueOf(s);
                                createCell(i, d, cellStyle.get("data").getIndex());
                            } else {
                                createCell(i, s, cellStyle.get("data").getIndex());
                            }
                        }
                    }
                }
            }

            endRow();
            this.rownum++;
        } catch(Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }

    public void fileClose(){
        try {
            endSheet();
            _out.close();
        } catch (IOException e) {
            throw new RsRuntimeException("error.common.excel.file");
        }
    }

    public String writeXlsxFile() throws Exception {
        // Properties props = Props.getInstance();
        String xmlTempPath = env.getProperty("file.path.create.excel");

        File tempDir = new File(xmlTempPath);

        File tempFile = null;
        FileOutputStream tempFileOutputStream = null;

        try {
            tempFile = File.createTempFile("xlsx", ".xlsx", tempDir);
            if (!tempFile.setWritable(true, true)){
                logger.warn("쓰기권한 없음");
            }
            if (!tempFile.setReadable(true, true)){
                logger.warn("읽기권한 없음");
            }
            if (!tempFile.setExecutable(false)){
                logger.warn("실행권한 있음");
            }

            tempFileOutputStream = new FileOutputStream(tempFile);
            wb.write(tempFileOutputStream);
        } catch(IOException ioe) {
            throw new RsRuntimeException("error.common.io");
        } finally {
            if(tempFileOutputStream != null) {
                try {
                    tempFileOutputStream.close();
                } catch(IOException ioe) {
                    throw new RsRuntimeException("error.common.io");
                }
            }
        }

        FileOutputStream fileOutputStream = null;
        ZipOutputStream zipOutputStream = null;
        File targetFile = null;
        Iterator<String> it = null;
        try {
            targetFile = File.createTempFile("tmp", ".xlsx", tempDir);
            if (!tempFile.setWritable(true, true)){
                logger.warn("쓰기권한 없음");
            }
            if (!tempFile.setReadable(true, true)){
                logger.warn("읽기권한 없음");
            }
            if (!tempFile.setExecutable(false)){
                logger.warn("실행권한 있음");
            }
            fileOutputStream = new FileOutputStream(targetFile);
            zipOutputStream = new ZipOutputStream(fileOutputStream);

            ZipFile zipFile = new ZipFile(tempFile);


            try {
                @SuppressWarnings("unchecked")
                Enumeration<ZipEntry> enumeration = (Enumeration<ZipEntry>) zipFile.entries();
                while(enumeration.hasMoreElements()) {
                    ZipEntry zipEntry = enumeration.nextElement();
                    if(!sheetMap.containsKey(zipEntry.getName())) {
                        zipOutputStream.putNextEntry(new ZipEntry(zipEntry.getName()));
                        InputStream inputStream = zipFile.getInputStream(zipEntry);
                        try {
                            copyStream(inputStream, zipOutputStream);
                        } catch(Exception e) {
                            throw new RsRuntimeException("error.common.excel.file");

                        } finally {
                            if(inputStream != null) {
                                try {
                                    inputStream.close();
                                } catch (Exception e) {
                                    throw new RsRuntimeException("error.common.excel.file");
                                }
                            }
                        }
                    }
                }

                it = sheetMap.keySet().iterator();

                while(it.hasNext()) {
                    String entry = it.next();
                    zipOutputStream.putNextEntry(new ZipEntry(entry));
                    InputStream inputStream = new FileInputStream((File) sheetMap.get(entry));
                    try {
                        copyStream(inputStream, zipOutputStream);
                    } catch(Exception e) {
                        throw new RsRuntimeException("error.common.excel.file");

                    } finally {
                        if(inputStream != null) {
                            try {
                                inputStream.close();
                            } catch (Exception e) {
                                throw new RsRuntimeException("error.common.io");
                            }
                        }
                    }
                }

            } catch(Exception e) {
                throw new RsRuntimeException("error.common.excel.file");
            } finally {
                if(zipFile != null) {
                    try {
                        zipFile.close();
                    } catch (Exception e) {
                        throw new RsRuntimeException("error.common.excel.file");
                    }
                }
                if(zipOutputStream != null) {
                    try {
                        zipOutputStream.close();
                    } catch (Exception e) {
                        throw new RsRuntimeException("error.common.excel.file");
                    }
                }
            }


            it = sheetMap.keySet().iterator();
            while(it.hasNext()) {
                String entry = it.next();
                sheetMap.get((entry)).delete();
            }
        } catch(IOException ioe) {
            throw new RsRuntimeException("error.common.excel.file");
        } catch(Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        } finally {
            tempFile.delete();
            try {
                if(fileOutputStream != null) {
                    fileOutputStream.close();
                }
            }catch (IOException ioe){
                throw new RsRuntimeException("error.common.excel.file");
            }

            try {
                if(zipOutputStream != null) {
                    zipOutputStream.close();
                }
            }catch (IOException ioe){
                throw new RsRuntimeException("error.common.io");
            }
        }
        // return xmlTempPath + targetFile.getName();
        return targetFile.getName();
    }

    private void copyStream(InputStream inputStream, OutputStream outputStream) throws IOException {
        byte[] b = new byte[1024];
        int count;
        while((count = inputStream.read(b)) >= 0) {
            outputStream.write(b, 0, count);
        }
    }

    private Map<String, Object> getHeaderInfo(Map<String, Object> retMap){
        String title=retMap.get("titleName").toString();
        String column=retMap.get("columnId").toString();
        String group=retMap.get("groupInfo").toString();

        String[] arTitle=title.split(",");
        String[] arColumn=column.toUpperCase().split(",");
        String[] arGroup=group.split(",");

        int colLength=arTitle.length;
        int grpLength=arGroup.length;
        int i=0;
        int j=0;

        StringBuilder merge=new StringBuilder();
        List<Map<String, Object>> grpInfoL=new ArrayList<Map<String,Object>>();
        int maxHeaderRow=1;
        for(i=0;i<grpLength;i++){
            String[] grp = arGroup[i].split(":");
            if(grp.length!=3) continue;
            int f=Integer.parseInt(grp[0]);
            int t=Integer.parseInt(grp[1]);
            String gTitle=grp[2];

            Map<String, Object> map=new HashMap<String, Object>();
            map.put("from", f);
            map.put("to", t);
            map.put("title", gTitle);

            int row=1;

            if(i==0){
                //row=row+1;
                map.put("row", row);
                map.put("merge", toAlphabet(f)+"1:"+toAlphabet(t)+"1");
                merge.append(toAlphabet(f)+"1:"+toAlphabet(t)+"1,");
                if(grpLength==1) {
                    maxHeaderRow=row+1;
                }
            }else{
                for(j=0;j<i;j++){
                    int compf=(Integer)grpInfoL.get(j).get("from");
                    int compt=(Integer)grpInfoL.get(j).get("to");

                    if(f>=compf && t<=compt){
                        row=row+1;
                    }
                }
                map.put("row", row);
                map.put("merge", toAlphabet(f)+Integer.toString(row)+":"+toAlphabet(t)+Integer.toString(row));
                merge.append(toAlphabet(f)+Integer.toString(row)+":"+toAlphabet(t)+Integer.toString(row)+",");
                if(row+1>maxHeaderRow) maxHeaderRow=row+1;
            }

            grpInfoL.add(map);
        }

        List<String> titleL=new ArrayList<String>();
        for(i=0;i<maxHeaderRow;i++){
            titleL.add("");
        }

        for(i=0;i<colLength;i++){
            int row=0;
            List<Map<String, String>> gTitleL=new ArrayList<Map<String,String>>();

            for(j=0;j<grpInfoL.size();j++){
                if(i>=(Integer)grpInfoL.get(j).get("from") && i<=(Integer)grpInfoL.get(j).get("to")){

                    if(row<(Integer)grpInfoL.get(j).get("row")){
                        row=(Integer)grpInfoL.get(j).get("row");
                    }

                    Map<String, String> map=new HashMap<String, String>();
                    map.put("row", Integer.toString(row));
                    map.put("title", grpInfoL.get(j).get("title").toString());
                    gTitleL.add(map);
                }
            }

            for(j=0;j<maxHeaderRow;j++){
                String tmp="";
                tmp=titleL.get(j).toString();

                if(row==0){
                    if(j==0) merge.append(toAlphabet(i)+Integer.toString(1)+":"+toAlphabet(i)+ Integer.toString(maxHeaderRow)+",");
                    tmp=tmp+arTitle[i]+",";
                }else{
                    if(maxHeaderRow - gTitleL.size() > 1){
                        if((j+1)==(maxHeaderRow-gTitleL.size())){
                            merge.append(toAlphabet(i)+Integer.toString(j+1)+":"+toAlphabet(i)+ Integer.toString(maxHeaderRow)+",");
                        }
                        if((j)<gTitleL.size()){
                            tmp=tmp+gTitleL.get(j).get("title")+",";
                        }else{
                            tmp=tmp+arTitle[i]+",";
                        }
                    }else{
                        if((j+1)==maxHeaderRow){
                            //EX) 3단 j=2
                            tmp=tmp+arTitle[i]+",";
                        }else{
                            //EX) 3단 j=0, 1
                            tmp=tmp+gTitleL.get(j).get("title")+",";
                        }
                    }
                }

                titleL.remove(j);
                titleL.add(j, tmp);
            }
        }

        if(merge.toString().length()>0) {
            retMap.put("mergeCell", merge.toString().substring(0, merge.toString().length()-1).split(","));
        }

        List<String[]> titleLL=new ArrayList<String[]>();
        for(i=0;i<titleL.size();i++){
            String tmp=titleL.get(i);
            tmp=tmp.substring(0, tmp.length()-1);
            titleLL.add(tmp.split(","));
        }
        retMap.put("titleName", titleLL);
        retMap.put("columnId", arColumn);
        retMap.put("maxHeaderRow", maxHeaderRow);

        return retMap;
    }

    private String toAlphabet(int i){
        if(i<0) {
            return "-" + toAlphabet(-i-1);
        }
        int quot=i/26;
        int rem=i%26;
        char letter=(char)((int)'A'+rem);
        if(quot==0){
            return ""+letter;
        }else{
            return toAlphabet(quot-1)+letter;
        }
    }
}
