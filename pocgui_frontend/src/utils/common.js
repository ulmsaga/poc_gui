import custAxios from "api/custAxios";
import axios from "axios";

const lpad = (src, padChar, padNum) => {
  let tmp = '';
  for (let i=0; i < padNum - src.toString().length; i++) {
    tmp += padChar;
  }
  return tmp+src;
};

const fnDateAdd = (date, interval, units) => {
  let ret = new Date(date); //don't change original date
		switch(interval.toLowerCase()) {
			case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
			case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
			case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
			case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
			case 'day'    :  ret.setDate(ret.getDate() + units);  break;
			case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
			case 'min' :  ret.setTime(ret.getTime() + units*60000);  break;
			case 'sec' :  ret.setTime(ret.getTime() + units*1000);  break;
			default       :  ret = undefined;  break;
		}
	return ret;
};

const fnDateMinus = (date, interval, units)  => {
  let ret = new Date(date); //don't change original date
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() - units);  break;
    case 'quarter':  ret.setMonth(ret.getMonth() - 3*units);  break;
    case 'month'  :  ret.setMonth(ret.getMonth() - units);  break;
    case 'week'   :  ret.setDate(ret.getDate() - 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() - units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() - units*3600000);  break;
    case 'min' :  ret.setTime(ret.getTime() - units*60000);  break;
    case 'sec' :  ret.setTime(ret.getTime() - units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
};

const fnStrToDate = (strDate) => {
  //170818 khs Object형일경우, .length인식하지 않아 toString 추가 해줌
  strDate = strDate.toString();
  let date = new Date();
  if(strDate.length === 12){
    date = new Date(
      strDate.substr(0, 4)
      ,strDate.substr(4, 2) -1
      ,strDate.substr(6, 2)
      ,strDate.substr(8, 2)
      ,strDate.substr(10, 2)
      ,'00'
    );
  }else if(strDate.length === 10){
    date = new Date(
      strDate.substr(0, 4)
      ,strDate.substr(4, 2)-1
      ,strDate.substr(6, 2)
      ,strDate.substr(8, 2)
      ,'00'
      ,'00'
    );
  }else if(strDate.length === 8){
    date = new Date(
      strDate.substr(0, 4)
      ,strDate.substr(4, 2)-1
      ,strDate.substr(6, 2)
      ,'00'
      ,'00'
      ,'00'
    );
  }else if(strDate.length >= 14){
    date = new Date(
      strDate.substr(0, 4)
      ,strDate.substr(4, 2) -1
      ,strDate.substr(6, 2)
      ,strDate.substr(8, 2)
      ,strDate.substr(10, 2)
      ,strDate.substr(12, 2)
    );
  }
  return date;
};

const fnFormatStrToDate = (sFormatDate) => {
  /* eslint-disable no-useless-escape */
  const tmp=sFormatDate.replace(/\-/gi, '').replace(/\:/gi, '').replace(/\ /gi, '').replace(/\//gi, '').replace(/\\/gi, '').replace(/\./gi, '');
  return fnStrToDate(tmp);
};

const fnFormatStrRemoveFormat = (sFormatDate) => {
  const tmp=sFormatDate.replace(/\-/gi, '').replace(/\:/gi, '').replace(/\ /gi, '').replace(/\//gi, '').replace(/\\/gi, '').replace(/\./gi, '');
  return tmp;
};

/* eslint-disable  no-array-constructor */
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
// const FILE_EXT = ['gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pcap', 'txt', 'ppt', 'pptx', 'pdf'];
const LZ = (x) => {return(x<0||x>9?"":"0")+x}
// const PATTERN_SPC = /[~!@#$%^&*+|<>?:{}'"]/

const formatDate = (date,format) => {
  format=format+"";
  let result="";
  let i_format=0;
  let c="";
  let token="";
  let y=date.getYear()+"";
  let M=date.getMonth()+1;
  let d=date.getDate();
  let E=date.getDay();
  let H=date.getHours();
  let m=date.getMinutes();
  let s=date.getSeconds();
  // let yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
  // Convert real date parts into formatted versions
  let value = {};
  if (y.length < 4) {y=""+(y-0+1900);}
  value["y"]=""+y;
  value["yyyy"]=y;
  value["yy"]=y.substring(2,4);
  value["M"]=M;
  value["MM"]=LZ(M);
  value["MMM"]=MONTH_NAMES[M-1];
  value["NNN"]=MONTH_NAMES[M+11];
  value["d"]=d;
  value["dd"]=LZ(d);
  value["E"]=DAY_NAMES[E+7];
  value["EE"]=DAY_NAMES[E];
  value["H"]=H;
  value["HH"]=LZ(H);
  if (H===0){value["h"]=12;}
  else if (H>12){value["h"]=H-12;}
  else {value["h"]=H;}
  value["hh"]=LZ(value["h"]);
  if (H>11){value["K"]=H-12;} else {value["K"]=H;}
  value["k"]=H+1;
  value["KK"]=LZ(value["K"]);
  value["kk"]=LZ(value["k"]);
  if (H > 11) { value["a"]="PM"; }
  else { value["a"]="AM"; }
  value["m"]=m;
  value["mm"]=LZ(m);
  value["s"]=s;
  value["ss"]=LZ(s);
  while (i_format < format.length) {
      c=format.charAt(i_format);
      token="";
      while ((format.charAt(i_format)===c) && (i_format < format.length)) {
          token += format.charAt(i_format++);
          }
      if (value[token] != null) { result=result + value[token]; }
      else { result=result + token; }
      }
  return result;
};

const formatDate5M = (date,format) => {
  format=format+"";
  let result="";
  let i_format=0;
  let c="";
  let token="";
  let y=date.getYear()+"";
  let M=date.getMonth()+1;
  let d=date.getDate();
  let E=date.getDay();
  let H=date.getHours();
  let m=this.chgMinToLess5M(date.getMinutes());
  let s=date.getSeconds();
  // let yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
  // Convert real date parts into formatted versions
  let value={};
  if (y.length < 4) {y=""+(y-0+1900);}
  value["y"]=""+y;
  value["yyyy"]=y;
  value["yy"]=y.substring(2,4);
  value["M"]=M;
  value["MM"]=LZ(M);
  value["MMM"]=MONTH_NAMES[M-1];
  value["NNN"]=MONTH_NAMES[M+11];
  value["d"]=d;
  value["dd"]=LZ(d);
  value["E"]=DAY_NAMES[E+7];
  value["EE"]=DAY_NAMES[E];
  value["H"]=H;
  value["HH"]=LZ(H);
  if (H===0){value["h"]=12;}
  else if (H>12){value["h"]=H-12;}
  else {value["h"]=H;}
  value["hh"]=LZ(value["h"]);
  if (H>11){value["K"]=H-12;} else {value["K"]=H;}
  value["k"]=H+1;
  value["KK"]=LZ(value["K"]);
  value["kk"]=LZ(value["k"]);
  if (H > 11) { value["a"]="PM"; }
  else { value["a"]="AM"; }
  value["m"]=m;
  value["mm"]=LZ(m);
  value["s"]=s;
  value["ss"]=LZ(s);
  while (i_format < format.length) {
      c=format.charAt(i_format);
      token="";
      while ((format.charAt(i_format)===c) && (i_format < format.length)) {
          token += format.charAt(i_format++);
          }
      if (value[token] != null) { result=result + value[token]; }
      else { result=result + token; }
      }
  return result;
}

const chgMinToLess5M = (min) => {
  let ret = 0;
  let strMin = min.toString();
  let tmp = '';
  if (strMin.length === 2) {
    tmp = strMin.substr(1, 2);
  } else {
    tmp = strMin;
  }
  if (tmp*1 > 5) {
    ret = strMin * 1 - (tmp * 1 - 5)
  } else {
    ret = strMin * 1 - tmp * 1
  }
  return ret;
};

const isNum = (s) => {
  if (s.toString().replace(/[0-9]+/g, '').length > 0 ){
    return false;
  }
  return true;
};

const getColsAndGrpsWithAgType = (def) => {
  const tmp = JSON.parse(JSON.stringify(def));
  const tmpGrps = [];
  const tmpCols = [];
  let nGrpStart = 0;
  let nGrpEnd = 0;
  let title = '';
  tmp.forEach(e => {
    if (e.children === undefined) {
      // Grps (X)
      tmpCols.push({
        key: e.field,
        title: e.headerName,
        hidden: e.hide
      });
    } else {
      // Grps (O)
      title = e.headerName;
      e.children.forEach((v, i) => {
        nGrpEnd = nGrpStart + i;
        tmpCols.push({
          key: v.field,
          title: v.headerName,
          hidden: v.hide
        });
      });
      tmpGrps.push({
        fromIndex: nGrpStart,
        toIndex: nGrpEnd,
        title: title
      })
      nGrpStart = nGrpEnd + 1;
    }
  });

  return {
    tmpCols,
    tmpGrps
  }
};

const getHeaderInfoForExcel = ( param, headerL, groupL ) => {
  let title=''
  let column=''
  let group=''
  let hiddenL=[]
  // let lIdx = 0

  headerL.forEach((v, k) => {
    let hidden=false
    if(v.hidden!==undefined){
      if(v.hidden===true){
        hidden=true
        hiddenL.push(k)
      }
    }
    if(!hidden){
      if (v.title === undefined) v.title = '-';
      if (v.title === '') v.title = '-';
      // title.append(v.title.replace(/<br>/gi, " ")+",")
      title = title + v.title.replace(/<br>/gi, " ") + ",";
      // column.append(v.key+",")
      column = column + v.key + ",";
    }
  });

  if(groupL!==undefined && groupL!==null){

    groupL.forEach((v, k) => {
      let fIdx=v.fromIndex
      let tIdx=v.toIndex
      let gTitle=v.title.replace(/<br>/gi, " ")
      let grpAreaFIdx=0
      // let grpAreaTIdx=0

      // if(!_.isNumber(fIdx)){
      if(!isNum(fIdx)){
        headerL.forEach((v, k) => {
          if(v.key===fIdx && k >= grpAreaFIdx){
            fIdx=k
          }
          if(v.key===tIdx && k >= grpAreaFIdx && k >= fIdx){
            tIdx=k
          }
          if (tIdx > grpAreaFIdx) {
            grpAreaFIdx = fIdx
            grpAreaFIdx = tIdx
          }
        });
      }
      
      let fR=0
      let tR=0
      let valid=true
      for(let i=0;i<hiddenL.length;i++){
        if(fIdx === hiddenL[i] || tIdx === hiddenL[i]){
          valid=false
          continue
        }
        
        if(fIdx>hiddenL[i]) fR=fR+1
        if(tIdx>hiddenL[i]) tR=tR+1
      }
      
      if(valid) {
        fIdx=fIdx-fR
        tIdx=tIdx-tR
        // group.append(fIdx+":"+tIdx+":"+gTitle+",");
        group = group + fIdx+":"+tIdx+":"+gTitle+",";
      }
    });
  }
  
  param.titleName=title.toString()
  param.columnId=column.toString()
  param.groupInfo=group.toString()
  param.useMakeHeader="1"
  
  if(param.titleName.length > 0) param.titleName=param.titleName.substr(0, param.titleName.length - 1)
  if(param.columnId.length > 0) param.columnId=param.columnId.substr(0, param.columnId.length - 1)
  if(param.groupInfo.length > 0) param.groupInfo=param.groupInfo.substr(0, param.groupInfo.length - 1)
}

const getExcelFile = ( excelApiUri, searchParam, colDefs, downloadFileName, alert ) => {
  const headerParam = {}
  const colsAndGrps = getColsAndGrpsWithAgType(colDefs);
  getHeaderInfoForExcel( headerParam, colsAndGrps.tmpCols, colsAndGrps.tmpGrps);
  headerParam.fileName = downloadFileName;
  headerParam.fileExt = 'xlsx';
  const paramXls = {...searchParam, ...headerParam};
  custAxios.post(excelApiUri, paramXls)
    .then(response => response.data)
    .then((ret) => {
      let fileName = (ret.rs !== undefined) ? ret.rs.file_name : '';
      let URI = '/dgw_service/common/filemanage/fileDownload';
      axios.post(
        `${URI}`
        , { targetFile: ret.rs.target_file, targetPathKey: ret.rs.target_path_key, fileName: ret.rs.file_name, fileExt: ret.rs.file_ext }
        , { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}, responseType: 'arraybuffer' }
      )
      .then((ret) => {
        if (ret.data.byteLength <= 97) {
          alert('파일 다운로드에 실패하였습니다.')
          return
        }

        let blob = new Blob([ret.data], {type: ret.headers['content-type']});
        fileName = !fileName ? 'export' : fileName;
        fileName = fileName+'_'+ formatDate(new Date(), "yyyyMMddHHmm00")+'.xlsx';

        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          //this.fileCheck(fileName);
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.style = 'display: none'
          link.target = '_self'
          link.download = fileName
          link.click()
          link.remove()
        }
      })
    });
};

const fileDownload = (targetFile, fileName, fileExt, protectFileFlag, useDateTimeToFileName, alert) => {

  if (protectFileFlag === undefined || protectFileFlag === null) protectFileFlag = "N";
  if (useDateTimeToFileName === undefined || useDateTimeToFileName === null) useDateTimeToFileName = true;

  let URI = '/dgw_service/common/filemanage/fileDownload';
      axios.post(
        `${URI}`
        , { targetFile: targetFile, targetPathKey: "", fileName: fileName, fileExt: fileExt, protectFile: protectFileFlag }
        , { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}, responseType: 'arraybuffer' }
      )
      .then((ret) => {
        /*
        if (ret.data.byteLength <= 97) {
          alert('파일 다운로드에 실패하였습니다.')
          return
        }
        */
        if (ret.data.byteLength < 200) {
          try {
            const arrayBuffer = new Uint8Array(ret.data);
            const encodedStr = String.fromCharCode.apply(null, arrayBuffer);
            const decodedStr = decodeURIComponent(escape(encodedStr));
            
            if (decodedStr.includes("result") && decodedStr.includes("errorMessage")) {
              const retObj = JSON.parse(decodedStr);
              let errMessage = '파일 다운로드에 실패하였습니다.';
              if (retObj.result === -1) {
                errMessage = retObj.errorMessage;
                alert(errMessage + '<br>관리자에게 문의해 주시기 바랍니다.');
                return;
              }
            }
          } catch (error) {
            console.log(error);
          }
        }

        let blob = new Blob([ret.data], {type: ret.headers['content-type']});

        if (useDateTimeToFileName) {
          const tmpFileName = fileName.split(".").shift();
          fileName = !fileName ? 'export' : tmpFileName;
          fileName = fileName+'_'+ formatDate(new Date(), "yyyyMMddHHmm00") + '.' + fileExt;
        }

        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          //this.fileCheck(fileName);
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.style = 'display: none'
          link.target = '_self'
          link.download = fileName
          link.click()
          link.remove()
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      
};

const sleep = (ms) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {};
};

const getBytesLengthOfUtf8Str = (s, b, i, c) => {
  if (s !== undefined && s !== "") { // eslint-disable-next-line
    for (b=i=0; c=s.charCodeAt(i++); b+=c>>11?3 : c>>7?2 : 1);
    return b;
  } else {
    return 0;
  }
};

const getBytesLengthOfKrStr = (s, k) => {
  const contents = s;
  let str_character;
  let int_char_count = 0;
  let int_contents_length = contents?.length;

  for (k = 0; k < int_contents_length; k++) {
    str_character = contents.charAt(k);
    if (escape(str_character).length > 4)
    // if (encodeURIComponent(str_character).length > 4)
      int_char_count += 2;
    else
      int_char_count++;
  }

  return int_char_count;
};

export { 
  lpad
, fnDateAdd
, fnDateMinus
, fnStrToDate
, fnFormatStrToDate
, fnFormatStrRemoveFormat
, formatDate
, formatDate5M
, chgMinToLess5M
, getExcelFile
, fileDownload
, sleep
, getBytesLengthOfUtf8Str
, getBytesLengthOfKrStr
}