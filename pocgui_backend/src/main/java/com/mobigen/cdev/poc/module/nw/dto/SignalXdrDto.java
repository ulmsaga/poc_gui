package com.mobigen.cdev.poc.module.nw.dto;

import java.text.DecimalFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

@JsonInclude(Include.ALWAYS)
public class SignalXdrDto extends BaseObject {
	private static final long serialVersionUID = -860897073936370851L;
	
	private String enc="****";
	DecimalFormat df = new DecimalFormat("#,###");
	private String event_time;
	private String event_exp_time;
	private String summarycreatetime;
	private String ongoingflag;
	private String imsi;
	private String mdn;
	private String imei;
	private String servicecode;
	private String paycode;
	private String gender;
	private String age;
	private String vendor;
	private String model;
	private String pgw_id;
	private String ims_pgw_id;
	private String sgw_id;
	private String mme_id;
	private String eq_s6a_authentication_equip_type;
	private String eq_s6a_authentication_equip_id;
	private String eq_s6a_location_equip_type;
	private String eq_s6a_location_equip_id;
	private String eq_s13_equip_type;
	private String masking_flag;
	
	private String eq_s13_equip_id;
	private String first_enb_id;
	private String first_cell_id;
	private String first_enb_plmn;
	private String first_enb_vlan_id;
	private String last_enb_id;
	private String last_cell_id;
	private String last_enb_plmn;
	private String last_enb_vlan_id;
	private String pdn_type;
	private String pdn_ipv4;
	private String pdn_ipv6;
	private String ims_pdn_type;
	private String ims_pdn_ipv4;
	private String ims_pdn_ipv6;
	private String old_call_type;
	private String old_call_end_time;
	private String old_call_last_enb_id;
	private String old_call_last_enb_plmn;
	private String old_call_last_cell_id;
	private String old_call_last_tac;
	private String call_type;
	private String call_start_time;
	private String call_end_time;
	private String call_duration_time;
	private String apn;
	private String ims_apn;
	private String diam_s6a_error_message;
	private String diam_s6a_error_time;
	private String diam_s6a_error_cause;
	private String authenticationinformation_time;
	private String authenticationinformation_cause;
	private String updatelocation_time;
	private String updatelocation_cause;
	private String diam_s13_error_message;
	private String diam_s13_error_time;
	private String diam_s13_error_cause;
	private String meidentitycheck_time;
	private String meidentitycheck_cause;
	private String smme_s1ap_error_message;
	private String smme_s1ap_error_time;
	private String smme_s1ap_error_cause;
	private String cndomain;
	private String initialuemessage_rrc_establishment_cause;
	private String pathswitch_count;
	private String pathswitchfailure_count;
	private String uecontextreleaserequest_time;
	private String uecontextreleaserequest_cause;
	private String uecontextrelease_time;
	private String uecontextrelease_cause;
	private String emm_error_message;
	private String emm_error_time;
	private String emm_error_cause;
	private String detachrequest_time;
	private String detachrequest_cause;
	private String detachrequest_type;
	private String detachrequest_switchoff;
	private String detachrequest_direction;
	private String esm_error_message;
	private String esm_error_time;
	private String esm_error_cause;
	private String gtp_s11_error_message;
	private String gtp_s11_error_time;
	private String gtp_s11_error_cause;
	private String gtp_s10_error_message;
	private String gtp_s10_error_time;
	private String gtp_s10_error_cause;
	private String gtp_s3_error_message;
	private String gtp_s3_error_time;
	private String gtp_s3_error_cause;
	private String sms_mo_cp_error_cause;
	private String sms_mo_rp_error_cause;
	private String sms_mo_tp_error_cause;
	private String sms_mt_cp_error_cause;
	private String sms_mt_rp_error_cause;
	private String sms_mt_tp_error_cause;
	private String attempt_flag;
	private String success_flag;
	private String data_attempt_flag;
	private String data_success_flag;
	private String ims_attempt_flag;
	private String ims_success_flag;
	private String drop_flag;
	private String paging_attempt_flag;
	private String paging_success_flag;
	private String detach_flag;
	private String npr_flag;
	private String auth_attempt_flag;
	private String auth_success_flag;
	private String location_attempt_flag;
	private String location_success_flag;
	private String mecheck_attempt_flag;
	private String mecheck_success_flag;
	private String first_error_interface_protocol;
	private String first_error_message;
	private String first_error_time;
	private String first_error_cause;
	private String last_error_interface_protocol;
	private String last_error_message;
	private String last_error_time;
	private String last_error_cause;
	
	// 2022.09.30 추가
	private String old_call_error_interface_protocol;
	private String old_call_error_cause;
	
	private String interval_first_enb_id;
	private String interval_first_enb_ip;
	private String interval_first_cell_id;
	private String interval_first_enb_plmn;
	private String interval_first_tac;
	private String interval_first_enb_c_uid;
	private String interval_first_enb_vlan_id;
	private String interval_call_start_time;
	
	// add
	private String imsi_original;
	private String mme_id_original;
	private String imsi_exp;
	private String servicecode_exp;
	public String getEnc() {
		return enc;
	}
	public void setEnc(String enc) {
		this.enc = enc;
	}
	public DecimalFormat getDf() {
		return df;
	}
	public void setDf(DecimalFormat df) {
		this.df = df;
	}
	public String getEvent_time() {
		return event_time;
	}
	public void setEvent_time(String event_time) {
		this.event_time = event_time;
	}
	public String getEvent_exp_time() {
		return event_exp_time;
	}
	public void setEvent_exp_time(String event_exp_time) {
		this.event_exp_time = event_exp_time;
	}
	public String getSummarycreatetime() {
		return summarycreatetime;
	}
	public void setSummarycreatetime(String summarycreatetime) {
		this.summarycreatetime = summarycreatetime;
	}
	public String getOngoingflag() {
		return ongoingflag;
	}
	public void setOngoingflag(String ongoingflag) {
		this.ongoingflag = ongoingflag;
	}
	public String getImsi() {
		return imsi;
	}
	public void setImsi(String imsi) {
		this.imsi = imsi;
	}
	public String getMdn() {
		return mdn;
	}
	public void setMdn(String mdn) {
		this.mdn = mdn;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getServicecode() {
		return servicecode;
	}
	public void setServicecode(String servicecode) {
		this.servicecode = servicecode;
	}
	public String getPaycode() {
		return paycode;
	}
	public void setPaycode(String paycode) {
		this.paycode = paycode;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getVendor() {
		return vendor;
	}
	public void setVendor(String vendor) {
		this.vendor = vendor;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getPgw_id() {
		return pgw_id;
	}
	public void setPgw_id(String pgw_id) {
		this.pgw_id = pgw_id;
	}
	public String getIms_pgw_id() {
		return ims_pgw_id;
	}
	public void setIms_pgw_id(String ims_pgw_id) {
		this.ims_pgw_id = ims_pgw_id;
	}
	public String getSgw_id() {
		return sgw_id;
	}
	public void setSgw_id(String sgw_id) {
		this.sgw_id = sgw_id;
	}
	public String getMme_id() {
		return mme_id;
	}
	public void setMme_id(String mme_id) {
		this.mme_id = mme_id;
	}
	public String getEq_s6a_authentication_equip_type() {
		return eq_s6a_authentication_equip_type;
	}
	public void setEq_s6a_authentication_equip_type(
			String eq_s6a_authentication_equip_type) {
		this.eq_s6a_authentication_equip_type = eq_s6a_authentication_equip_type;
	}
	public String getEq_s6a_authentication_equip_id() {
		return eq_s6a_authentication_equip_id;
	}
	public void setEq_s6a_authentication_equip_id(
			String eq_s6a_authentication_equip_id) {
		this.eq_s6a_authentication_equip_id = eq_s6a_authentication_equip_id;
	}
	public String getEq_s6a_location_equip_type() {
		return eq_s6a_location_equip_type;
	}
	public void setEq_s6a_location_equip_type(String eq_s6a_location_equip_type) {
		this.eq_s6a_location_equip_type = eq_s6a_location_equip_type;
	}
	public String getEq_s6a_location_equip_id() {
		return eq_s6a_location_equip_id;
	}
	public void setEq_s6a_location_equip_id(String eq_s6a_location_equip_id) {
		this.eq_s6a_location_equip_id = eq_s6a_location_equip_id;
	}
	public String getEq_s13_equip_type() {
		return eq_s13_equip_type;
	}
	public void setEq_s13_equip_type(String eq_s13_equip_type) {
		this.eq_s13_equip_type = eq_s13_equip_type;
	}
	public String getMasking_flag() {
		return masking_flag;
	}
	public void setMasking_flag(String masking_flag) {
		this.masking_flag = masking_flag;
	}
	public String getEq_s13_equip_id() {
		return eq_s13_equip_id;
	}
	public void setEq_s13_equip_id(String eq_s13_equip_id) {
		this.eq_s13_equip_id = eq_s13_equip_id;
	}
	public String getFirst_enb_id() {
		return first_enb_id;
	}
	public void setFirst_enb_id(String first_enb_id) {
		this.first_enb_id = first_enb_id;
	}
	public String getFirst_cell_id() {
		return first_cell_id;
	}
	public void setFirst_cell_id(String first_cell_id) {
		this.first_cell_id = first_cell_id;
	}
	public String getFirst_enb_vlan_id() {
		return first_enb_vlan_id;
	}
	public void setFirst_enb_vlan_id(String first_enb_vlan_id) {
		this.first_enb_vlan_id = first_enb_vlan_id;
	}
	public String getLast_enb_id() {
		return last_enb_id;
	}
	public void setLast_enb_id(String last_enb_id) {
		this.last_enb_id = last_enb_id;
	}
	public String getLast_cell_id() {
		return last_cell_id;
	}
	public void setLast_cell_id(String last_cell_id) {
		this.last_cell_id = last_cell_id;
	}
	public String getLast_enb_vlan_id() {
		return last_enb_vlan_id;
	}
	public void setLast_enb_vlan_id(String last_enb_vlan_id) {
		this.last_enb_vlan_id = last_enb_vlan_id;
	}
	public String getPdn_type() {
		return pdn_type;
	}
	public void setPdn_type(String pdn_type) {
		this.pdn_type = pdn_type;
	}
	public String getPdn_ipv4() {
		return pdn_ipv4;
	}
	public void setPdn_ipv4(String pdn_ipv4) {
		this.pdn_ipv4 = pdn_ipv4;
	}
	public String getPdn_ipv6() {
		return pdn_ipv6;
	}
	public void setPdn_ipv6(String pdn_ipv6) {
		this.pdn_ipv6 = pdn_ipv6;
	}
	public String getIms_pdn_type() {
		return ims_pdn_type;
	}
	public void setIms_pdn_type(String ims_pdn_type) {
		this.ims_pdn_type = ims_pdn_type;
	}
	public String getIms_pdn_ipv4() {
		return ims_pdn_ipv4;
	}
	public void setIms_pdn_ipv4(String ims_pdn_ipv4) {
		this.ims_pdn_ipv4 = ims_pdn_ipv4;
	}
	public String getIms_pdn_ipv6() {
		return ims_pdn_ipv6;
	}
	public void setIms_pdn_ipv6(String ims_pdn_ipv6) {
		this.ims_pdn_ipv6 = ims_pdn_ipv6;
	}
	public String getOld_call_type() {
		return old_call_type;
	}
	public void setOld_call_type(String old_call_type) {
		this.old_call_type = old_call_type;
	}
	public String getOld_call_end_time() {
		return old_call_end_time;
	}
	public void setOld_call_end_time(String old_call_end_time) {
		this.old_call_end_time = old_call_end_time;
	}
	public String getOld_call_last_enb_id() {
		return old_call_last_enb_id;
	}
	public void setOld_call_last_enb_id(String old_call_last_enb_id) {
		this.old_call_last_enb_id = old_call_last_enb_id;
	}
	public String getOld_call_last_cell_id() {
		return old_call_last_cell_id;
	}
	public void setOld_call_last_cell_id(String old_call_last_cell_id) {
		this.old_call_last_cell_id = old_call_last_cell_id;
	}
	public String getOld_call_last_tac() {
		return old_call_last_tac;
	}
	public void setOld_call_last_tac(String old_call_last_tac) {
		this.old_call_last_tac = old_call_last_tac;
	}
	public String getCall_type() {
		return call_type;
	}
	public void setCall_type(String call_type) {
		this.call_type = call_type;
	}
	public String getCall_start_time() {
		return call_start_time;
	}
	public void setCall_start_time(String call_start_time) {
		this.call_start_time = call_start_time;
	}
	public String getCall_end_time() {
		return call_end_time;
	}
	public void setCall_end_time(String call_end_time) {
		this.call_end_time = call_end_time;
	}
	public String getCall_duration_time() {
		return call_duration_time;
	}
	public void setCall_duration_time(String call_duration_time) {
		this.call_duration_time = call_duration_time;
	}
	public String getApn() {
		return apn;
	}
	public void setApn(String apn) {
		this.apn = apn;
	}
	public String getIms_apn() {
		return ims_apn;
	}
	public void setIms_apn(String ims_apn) {
		this.ims_apn = ims_apn;
	}
	public String getDiam_s6a_error_message() {
		return diam_s6a_error_message;
	}
	public void setDiam_s6a_error_message(String diam_s6a_error_message) {
		this.diam_s6a_error_message = diam_s6a_error_message;
	}
	public String getDiam_s6a_error_time() {
		return diam_s6a_error_time;
	}
	public void setDiam_s6a_error_time(String diam_s6a_error_time) {
		this.diam_s6a_error_time = diam_s6a_error_time;
	}
	public String getDiam_s6a_error_cause() {
		return diam_s6a_error_cause;
	}
	public void setDiam_s6a_error_cause(String diam_s6a_error_cause) {
		this.diam_s6a_error_cause = diam_s6a_error_cause;
	}
	public String getAuthenticationinformation_time() {
		return authenticationinformation_time;
	}
	public void setAuthenticationinformation_time(
			String authenticationinformation_time) {
		this.authenticationinformation_time = authenticationinformation_time;
	}
	public String getAuthenticationinformation_cause() {
		return authenticationinformation_cause;
	}
	public void setAuthenticationinformation_cause(
			String authenticationinformation_cause) {
		this.authenticationinformation_cause = authenticationinformation_cause;
	}
	public String getUpdatelocation_time() {
		return updatelocation_time;
	}
	public void setUpdatelocation_time(String updatelocation_time) {
		this.updatelocation_time = updatelocation_time;
	}
	public String getUpdatelocation_cause() {
		return updatelocation_cause;
	}
	public void setUpdatelocation_cause(String updatelocation_cause) {
		this.updatelocation_cause = updatelocation_cause;
	}
	public String getDiam_s13_error_message() {
		return diam_s13_error_message;
	}
	public void setDiam_s13_error_message(String diam_s13_error_message) {
		this.diam_s13_error_message = diam_s13_error_message;
	}
	public String getDiam_s13_error_time() {
		return diam_s13_error_time;
	}
	public void setDiam_s13_error_time(String diam_s13_error_time) {
		this.diam_s13_error_time = diam_s13_error_time;
	}
	public String getDiam_s13_error_cause() {
		return diam_s13_error_cause;
	}
	public void setDiam_s13_error_cause(String diam_s13_error_cause) {
		this.diam_s13_error_cause = diam_s13_error_cause;
	}
	public String getMeidentitycheck_time() {
		return meidentitycheck_time;
	}
	public void setMeidentitycheck_time(String meidentitycheck_time) {
		this.meidentitycheck_time = meidentitycheck_time;
	}
	public String getMeidentitycheck_cause() {
		return meidentitycheck_cause;
	}
	public void setMeidentitycheck_cause(String meidentitycheck_cause) {
		this.meidentitycheck_cause = meidentitycheck_cause;
	}
	public String getSmme_s1ap_error_message() {
		return smme_s1ap_error_message;
	}
	public void setSmme_s1ap_error_message(String smme_s1ap_error_message) {
		this.smme_s1ap_error_message = smme_s1ap_error_message;
	}
	public String getSmme_s1ap_error_time() {
		return smme_s1ap_error_time;
	}
	public void setSmme_s1ap_error_time(String smme_s1ap_error_time) {
		this.smme_s1ap_error_time = smme_s1ap_error_time;
	}
	public String getSmme_s1ap_error_cause() {
		return smme_s1ap_error_cause;
	}
	public void setSmme_s1ap_error_cause(String smme_s1ap_error_cause) {
		this.smme_s1ap_error_cause = smme_s1ap_error_cause;
	}
	public String getCndomain() {
		return cndomain;
	}
	public void setCndomain(String cndomain) {
		this.cndomain = cndomain;
	}
	public String getInitialuemessage_rrc_establishment_cause() {
		return initialuemessage_rrc_establishment_cause;
	}
	public void setInitialuemessage_rrc_establishment_cause(
			String initialuemessage_rrc_establishment_cause) {
		this.initialuemessage_rrc_establishment_cause = initialuemessage_rrc_establishment_cause;
	}
	public String getPathswitch_count() {
		return pathswitch_count;
	}
	public void setPathswitch_count(String pathswitch_count) {
		this.pathswitch_count = pathswitch_count;
	}
	public String getPathswitchfailure_count() {
		return pathswitchfailure_count;
	}
	public void setPathswitchfailure_count(String pathswitchfailure_count) {
		this.pathswitchfailure_count = pathswitchfailure_count;
	}
	public String getUecontextreleaserequest_time() {
		return uecontextreleaserequest_time;
	}
	public void setUecontextreleaserequest_time(String uecontextreleaserequest_time) {
		this.uecontextreleaserequest_time = uecontextreleaserequest_time;
	}
	public String getUecontextreleaserequest_cause() {
		return uecontextreleaserequest_cause;
	}
	public void setUecontextreleaserequest_cause(
			String uecontextreleaserequest_cause) {
		this.uecontextreleaserequest_cause = uecontextreleaserequest_cause;
	}
	public String getUecontextrelease_time() {
		return uecontextrelease_time;
	}
	public void setUecontextrelease_time(String uecontextrelease_time) {
		this.uecontextrelease_time = uecontextrelease_time;
	}
	public String getUecontextrelease_cause() {
		return uecontextrelease_cause;
	}
	public void setUecontextrelease_cause(String uecontextrelease_cause) {
		this.uecontextrelease_cause = uecontextrelease_cause;
	}
	public String getEmm_error_message() {
		return emm_error_message;
	}
	public void setEmm_error_message(String emm_error_message) {
		this.emm_error_message = emm_error_message;
	}
	public String getEmm_error_time() {
		return emm_error_time;
	}
	public void setEmm_error_time(String emm_error_time) {
		this.emm_error_time = emm_error_time;
	}
	public String getEmm_error_cause() {
		return emm_error_cause;
	}
	public void setEmm_error_cause(String emm_error_cause) {
		this.emm_error_cause = emm_error_cause;
	}
	public String getDetachrequest_time() {
		return detachrequest_time;
	}
	public void setDetachrequest_time(String detachrequest_time) {
		this.detachrequest_time = detachrequest_time;
	}
	public String getDetachrequest_cause() {
		return detachrequest_cause;
	}
	public void setDetachrequest_cause(String detachrequest_cause) {
		this.detachrequest_cause = detachrequest_cause;
	}
	public String getDetachrequest_type() {
		return detachrequest_type;
	}
	public void setDetachrequest_type(String detachrequest_type) {
		this.detachrequest_type = detachrequest_type;
	}
	public String getDetachrequest_switchoff() {
		return detachrequest_switchoff;
	}
	public void setDetachrequest_switchoff(String detachrequest_switchoff) {
		this.detachrequest_switchoff = detachrequest_switchoff;
	}
	public String getDetachrequest_direction() {
		return detachrequest_direction;
	}
	public void setDetachrequest_direction(String detachrequest_direction) {
		this.detachrequest_direction = detachrequest_direction;
	}
	public String getEsm_error_message() {
		return esm_error_message;
	}
	public void setEsm_error_message(String esm_error_message) {
		this.esm_error_message = esm_error_message;
	}
	public String getEsm_error_time() {
		return esm_error_time;
	}
	public void setEsm_error_time(String esm_error_time) {
		this.esm_error_time = esm_error_time;
	}
	public String getEsm_error_cause() {
		return esm_error_cause;
	}
	public void setEsm_error_cause(String esm_error_cause) {
		this.esm_error_cause = esm_error_cause;
	}
	public String getGtp_s11_error_message() {
		return gtp_s11_error_message;
	}
	public void setGtp_s11_error_message(String gtp_s11_error_message) {
		this.gtp_s11_error_message = gtp_s11_error_message;
	}
	public String getGtp_s11_error_time() {
		return gtp_s11_error_time;
	}
	public void setGtp_s11_error_time(String gtp_s11_error_time) {
		this.gtp_s11_error_time = gtp_s11_error_time;
	}
	public String getGtp_s11_error_cause() {
		return gtp_s11_error_cause;
	}
	public void setGtp_s11_error_cause(String gtp_s11_error_cause) {
		this.gtp_s11_error_cause = gtp_s11_error_cause;
	}
	public String getGtp_s10_error_message() {
		return gtp_s10_error_message;
	}
	public void setGtp_s10_error_message(String gtp_s10_error_message) {
		this.gtp_s10_error_message = gtp_s10_error_message;
	}
	public String getGtp_s10_error_time() {
		return gtp_s10_error_time;
	}
	public void setGtp_s10_error_time(String gtp_s10_error_time) {
		this.gtp_s10_error_time = gtp_s10_error_time;
	}
	public String getGtp_s10_error_cause() {
		return gtp_s10_error_cause;
	}
	public void setGtp_s10_error_cause(String gtp_s10_error_cause) {
		this.gtp_s10_error_cause = gtp_s10_error_cause;
	}
	public String getGtp_s3_error_message() {
		return gtp_s3_error_message;
	}
	public void setGtp_s3_error_message(String gtp_s3_error_message) {
		this.gtp_s3_error_message = gtp_s3_error_message;
	}
	public String getGtp_s3_error_time() {
		return gtp_s3_error_time;
	}
	public void setGtp_s3_error_time(String gtp_s3_error_time) {
		this.gtp_s3_error_time = gtp_s3_error_time;
	}
	public String getGtp_s3_error_cause() {
		return gtp_s3_error_cause;
	}
	public void setGtp_s3_error_cause(String gtp_s3_error_cause) {
		this.gtp_s3_error_cause = gtp_s3_error_cause;
	}
	public String getSms_mo_cp_error_cause() {
		return sms_mo_cp_error_cause;
	}
	public void setSms_mo_cp_error_cause(String sms_mo_cp_error_cause) {
		this.sms_mo_cp_error_cause = sms_mo_cp_error_cause;
	}
	public String getSms_mo_rp_error_cause() {
		return sms_mo_rp_error_cause;
	}
	public void setSms_mo_rp_error_cause(String sms_mo_rp_error_cause) {
		this.sms_mo_rp_error_cause = sms_mo_rp_error_cause;
	}
	public String getSms_mo_tp_error_cause() {
		return sms_mo_tp_error_cause;
	}
	public void setSms_mo_tp_error_cause(String sms_mo_tp_error_cause) {
		this.sms_mo_tp_error_cause = sms_mo_tp_error_cause;
	}
	public String getSms_mt_cp_error_cause() {
		return sms_mt_cp_error_cause;
	}
	public void setSms_mt_cp_error_cause(String sms_mt_cp_error_cause) {
		this.sms_mt_cp_error_cause = sms_mt_cp_error_cause;
	}
	public String getSms_mt_rp_error_cause() {
		return sms_mt_rp_error_cause;
	}
	public void setSms_mt_rp_error_cause(String sms_mt_rp_error_cause) {
		this.sms_mt_rp_error_cause = sms_mt_rp_error_cause;
	}
	public String getSms_mt_tp_error_cause() {
		return sms_mt_tp_error_cause;
	}
	public void setSms_mt_tp_error_cause(String sms_mt_tp_error_cause) {
		this.sms_mt_tp_error_cause = sms_mt_tp_error_cause;
	}
	public String getAttempt_flag() {
		return attempt_flag;
	}
	public void setAttempt_flag(String attempt_flag) {
		this.attempt_flag = attempt_flag;
	}
	public String getSuccess_flag() {
		return success_flag;
	}
	public void setSuccess_flag(String success_flag) {
		this.success_flag = success_flag;
	}
	public String getData_attempt_flag() {
		return data_attempt_flag;
	}
	public void setData_attempt_flag(String data_attempt_flag) {
		this.data_attempt_flag = data_attempt_flag;
	}
	public String getData_success_flag() {
		return data_success_flag;
	}
	public void setData_success_flag(String data_success_flag) {
		this.data_success_flag = data_success_flag;
	}
	public String getIms_attempt_flag() {
		return ims_attempt_flag;
	}
	public void setIms_attempt_flag(String ims_attempt_flag) {
		this.ims_attempt_flag = ims_attempt_flag;
	}
	public String getIms_success_flag() {
		return ims_success_flag;
	}
	public void setIms_success_flag(String ims_success_flag) {
		this.ims_success_flag = ims_success_flag;
	}
	public String getDrop_flag() {
		return drop_flag;
	}
	public void setDrop_flag(String drop_flag) {
		this.drop_flag = drop_flag;
	}
	public String getPaging_attempt_flag() {
		return paging_attempt_flag;
	}
	public void setPaging_attempt_flag(String paging_attempt_flag) {
		this.paging_attempt_flag = paging_attempt_flag;
	}
	public String getPaging_success_flag() {
		return paging_success_flag;
	}
	public void setPaging_success_flag(String paging_success_flag) {
		this.paging_success_flag = paging_success_flag;
	}
	public String getDetach_flag() {
		return detach_flag;
	}
	public void setDetach_flag(String detach_flag) {
		this.detach_flag = detach_flag;
	}
	public String getNpr_flag() {
		return npr_flag;
	}
	public void setNpr_flag(String npr_flag) {
		this.npr_flag = npr_flag;
	}
	public String getAuth_attempt_flag() {
		return auth_attempt_flag;
	}
	public void setAuth_attempt_flag(String auth_attempt_flag) {
		this.auth_attempt_flag = auth_attempt_flag;
	}
	public String getAuth_success_flag() {
		return auth_success_flag;
	}
	public void setAuth_success_flag(String auth_success_flag) {
		this.auth_success_flag = auth_success_flag;
	}
	public String getLocation_attempt_flag() {
		return location_attempt_flag;
	}
	public void setLocation_attempt_flag(String location_attempt_flag) {
		this.location_attempt_flag = location_attempt_flag;
	}
	public String getLocation_success_flag() {
		return location_success_flag;
	}
	public void setLocation_success_flag(String location_success_flag) {
		this.location_success_flag = location_success_flag;
	}
	public String getMecheck_attempt_flag() {
		return mecheck_attempt_flag;
	}
	public void setMecheck_attempt_flag(String mecheck_attempt_flag) {
		this.mecheck_attempt_flag = mecheck_attempt_flag;
	}
	public String getMecheck_success_flag() {
		return mecheck_success_flag;
	}
	public void setMecheck_success_flag(String mecheck_success_flag) {
		this.mecheck_success_flag = mecheck_success_flag;
	}
	public String getFirst_error_interface_protocol() {
		return first_error_interface_protocol;
	}
	public void setFirst_error_interface_protocol(
			String first_error_interface_protocol) {
		this.first_error_interface_protocol = first_error_interface_protocol;
	}
	public String getFirst_error_message() {
		return first_error_message;
	}
	public void setFirst_error_message(String first_error_message) {
		this.first_error_message = first_error_message;
	}
	public String getFirst_error_time() {
		return first_error_time;
	}
	public void setFirst_error_time(String first_error_time) {
		this.first_error_time = first_error_time;
	}
	public String getFirst_error_cause() {
		return first_error_cause;
	}
	public void setFirst_error_cause(String first_error_cause) {
		this.first_error_cause = first_error_cause;
	}
	public String getLast_error_interface_protocol() {
		return last_error_interface_protocol;
	}
	public void setLast_error_interface_protocol(
			String last_error_interface_protocol) {
		this.last_error_interface_protocol = last_error_interface_protocol;
	}
	public String getLast_error_message() {
		return last_error_message;
	}
	public void setLast_error_message(String last_error_message) {
		this.last_error_message = last_error_message;
	}
	public String getLast_error_time() {
		return last_error_time;
	}
	public void setLast_error_time(String last_error_time) {
		this.last_error_time = last_error_time;
	}
	public String getLast_error_cause() {
		return last_error_cause;
	}
	public void setLast_error_cause(String last_error_cause) {
		this.last_error_cause = last_error_cause;
	}
	public String getInterval_first_enb_id() {
		return interval_first_enb_id;
	}
	public void setInterval_first_enb_id(String interval_first_enb_id) {
		this.interval_first_enb_id = interval_first_enb_id;
	}
	public String getInterval_first_enb_ip() {
		return interval_first_enb_ip;
	}
	public void setInterval_first_enb_ip(String interval_first_enb_ip) {
		this.interval_first_enb_ip = interval_first_enb_ip;
	}
	public String getInterval_first_cell_id() {
		return interval_first_cell_id;
	}
	public void setInterval_first_cell_id(String interval_first_cell_id) {
		this.interval_first_cell_id = interval_first_cell_id;
	}
	public String getInterval_first_tac() {
		return interval_first_tac;
	}
	public void setInterval_first_tac(String interval_first_tac) {
		this.interval_first_tac = interval_first_tac;
	}
	public String getInterval_first_enb_c_uid() {
		return interval_first_enb_c_uid;
	}
	public void setInterval_first_enb_c_uid(String interval_first_enb_c_uid) {
		this.interval_first_enb_c_uid = interval_first_enb_c_uid;
	}
	public String getInterval_first_enb_vlan_id() {
		return interval_first_enb_vlan_id;
	}
	public void setInterval_first_enb_vlan_id(String interval_first_enb_vlan_id) {
		this.interval_first_enb_vlan_id = interval_first_enb_vlan_id;
	}
	public String getInterval_call_start_time() {
		return interval_call_start_time;
	}
	public void setInterval_call_start_time(String interval_call_start_time) {
		this.interval_call_start_time = interval_call_start_time;
	}
	public String getImsi_original() {
		return imsi_original;
	}
	public void setImsi_original(String imsi_original) {
		this.imsi_original = imsi_original;
	}
	public String getMme_id_original() {
		return mme_id_original;
	}
	public void setMme_id_original(String mme_id_original) {
		this.mme_id_original = mme_id_original;
	}
	public String getImsi_exp() {
		/*if(masking_flag.equals("1")){
			imsi_exp=imsi;
		}else{
			if(imsi.length()>3){
				imsi_exp=imsi.substring(0,imsi.length()-4)+enc;
			}else{
				imsi_exp=imsi;
			}
		}*/
		imsi_exp=imsi;
		return imsi_exp;
	}
	public void setImsi_exp(String imsi_exp) {
		this.imsi_exp = imsi_exp;
	}
	public String getServicecode_exp() {
		/*if(masking_flag.equals("1")){
			servicecode_exp=servicecode;
		}else{
			if(imsi.length()>3){
				servicecode_exp=servicecode.substring(0,servicecode.length()-4)+enc;
			}else{
				servicecode_exp=servicecode;
			}
		}*/
		servicecode_exp=servicecode;
		return servicecode_exp;
	}
	public void setServicecode_exp(String servicecode_exp) {
		this.servicecode_exp = servicecode_exp;
	}
	public String getFirst_enb_plmn() {
		return first_enb_plmn;
	}
	public void setFirst_enb_plmn(String first_enb_plmn) {
		this.first_enb_plmn = first_enb_plmn;
	}
	public String getLast_enb_plmn() {
		return last_enb_plmn;
	}
	public void setLast_enb_plmn(String last_enb_plmn) {
		this.last_enb_plmn = last_enb_plmn;
	}
	public String getOld_call_last_enb_plmn() {
		return old_call_last_enb_plmn;
	}
	public void setOld_call_last_enb_plmn(String old_call_last_enb_plmn) {
		this.old_call_last_enb_plmn = old_call_last_enb_plmn;
	}
	public String getInterval_first_enb_plmn() {
		return interval_first_enb_plmn;
	}
	public void setInterval_first_enb_plmn(String interval_first_enb_plmn) {
		this.interval_first_enb_plmn = interval_first_enb_plmn;
	}
	public String getOld_call_error_interface_protocol() {
		return old_call_error_interface_protocol;
	}
	public void setOld_call_error_interface_protocol(
			String old_call_error_interface_protocol) {
		this.old_call_error_interface_protocol = old_call_error_interface_protocol;
	}
	public String getOld_call_error_cause() {
		return old_call_error_cause;
	}
	public void setOld_call_error_cause(String old_call_error_cause) {
		this.old_call_error_cause = old_call_error_cause;
	}
}
