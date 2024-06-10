
  const callLogCols = [
    { headerName: 'Summary',
      children: [
        { headerName: 'event time', field: 'event_exp_time', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ongoing', field: 'ongoingflag', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'User',
      children: [
        { headerName: 'imsi', field: 'imsi', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'mdn', field: 'mdn', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'imei', field: 'imei', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'servicecode', field: 'servicecode', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'paycode', field: 'paycode', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gender', field: 'gender', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'age', field: 'age', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'vendor', field: 'vendor', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'model', field: 'model', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'Equipment',
      children: [
        { headerName: 'pgw_name', field: 'pgw_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_pgw_name', field: 'ims_pgw_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'sgw_name', field: 'sgw_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'mme_name', field: 'mme_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's6a_authentication_equip_type', field: 'eq_s6a_authentication_equip_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's6a_authentication_equip_id', field: 'eq_s6a_authentication_equip_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's6a_location_equip_type', field: 'eq_s6a_location_equip_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's6a_location_equip_id', field: 'eq_s6a_location_equip_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's13_equip_type', field: 'eq_s13_equip_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's13_equip_id', field: 'eq_s13_equip_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_enb', field: 'first_enb_id', width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_cell_id', field: 'first_cell_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_enb_plmn', field: 'first_enb_plmn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_enb_vlan_id', field: 'first_enb_vlan_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_enb', field: 'last_enb_id', width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_cell_id', field: 'last_cell_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_enb_plmn', field: 'last_enb_plmn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_enb_vlan_id', field: 'last_enb_vlan_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'pdn_type', field: 'pdn_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'pdn_ipv4', field: 'pdn_ipv4', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'pdn_ipv6', field: 'pdn_ipv6', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_pdn_type', field: 'ims_pdn_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_pdn_ipv4', field: 'ims_pdn_ipv4', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_pdn_ipv6', field: 'ims_pdn_ipv6', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'Call',
      children: [
        { headerName: 'old_call_type', field: 'old_call_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_end_time', field: 'old_call_end_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_last_enb', field: 'old_call_last_enb_id', width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_last_cell_id', field: 'old_call_last_cell_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_last_enb_plmn', field: 'old_call_last_enb_plmn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_last_tac', field: 'old_call_last_tac', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'call_type', field: 'call_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'call_start_time', field: 'call_start_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'call_end_time', field: 'call_end_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'call_duration_time', field: 'call_duration_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'APN',
      children: [
        { headerName: 'apn', field: 'apn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_apn', field: 'ims_apn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S13_Diameter',
      children: [
        { headerName: 's13_error_message', field: 'diam_s13_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's13_error_time', field: 'diam_s13_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's13_error_cause', field: 'diam_s13_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'meidentitycheck_time', field: 'meidentitycheck_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'meidentitycheck_cause', field: 'meidentitycheck_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S1MME_S1AP',
      children: [
        { headerName: 's1ap_error_message', field: 'smme_s1ap_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's1ap_error_time', field: 'smme_s1ap_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 's1ap_error_cause', field: 'smme_s1ap_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'cndomain', field: 'cndomain', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'initialuemessage_rrc_establishment_cause', field: 'initialuemessage_rrc_establishment_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'pathswitch_count', field: 'pathswitch_count', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'pathswitchfailure_count', field: 'pathswitchfailure_count', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'uecontextreleaserequest_time', field: 'uecontextreleaserequest_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'uecontextreleaserequest_cause', field: 'uecontextreleaserequest_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'uecontextrelease_time', field: 'uecontextrelease_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'uecontextrelease_cause', field: 'uecontextrelease_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S1MME_NAS-EMM',
      children: [
        { headerName: 'emm_error_message', field: 'emm_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'emm_error_time', field: 'emm_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'emm_error_cause', field: 'emm_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detachrequest_time', field: 'detachrequest_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detachrequest_cause', field: 'detachrequest_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detachrequest_type', field: 'detachrequest_type', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detachrequest_switchoff', field: 'detachrequest_switchoff', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detachrequest_direction', field: 'detachrequest_direction', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S1MME_NAS-ESM',
      children: [
        { headerName: 'esm_error_message', field: 'esm_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'esm_error_time', field: 'esm_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'esm_error_cause', field: 'esm_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S11_GTPv2C',
      children: [
        { headerName: 'gtp_s11_error_message', field: 'gtp_s11_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s11_error_time', field: 'gtp_s11_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s11_error_cause', field: 'gtp_s11_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S10_GTPv2C',
      children: [
        { headerName: 'gtp_s10_error_message', field: 'gtp_s10_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s10_error_time', field: 'gtp_s10_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s10_error_cause', field: 'gtp_s10_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'S3_GTPv1C',
      children: [
        { headerName: 'gtp_s3_error_message', field: 'gtp_s3_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s3_error_time', field: 'gtp_s3_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'gtp_s3_error_cause', field: 'gtp_s3_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'SGD_SMS_MO',
      children: [
        { headerName: 'sms_mo_cp_error_cause', field: 'sms_mo_cp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'sms_mo_rp_error_cause', field: 'sms_mo_rp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'sms_mo_tp_error_cause', field: 'sms_mo_tp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'SGD_SMS_MT',
      children: [
        { headerName: 'sms_mt_cp_error_cause', field: 'sms_mt_cp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'sms_mt_rp_error_cause', field: 'sms_mt_rp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'sms_mt_tp_error_cause', field: 'sms_mt_tp_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'KPI_Flag',
      children: [
        { headerName: 'attempt_flag', field: 'attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'success_flag', field: 'success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'data_attempt_flag', field: 'data_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'data_success_flag', field: 'data_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_attempt_flag', field: 'ims_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'ims_success_flag', field: 'ims_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'drop_flag', field: 'drop_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'paging_attempt_flag', field: 'paging_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'paging_success_flag', field: 'paging_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'detach_flag', field: 'detach_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'npr_flag', field: 'npr_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'auth_attempt_flag', field: 'auth_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'auth_success_flag', field: 'auth_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'location_attempt_flag', field: 'location_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'location_success_flag', field: 'location_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'mecheck_attempt_flag', field: 'mecheck_attempt_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'mecheck_success_flag', field: 'mecheck_success_flag', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'Error',
      children: [
        { headerName: 'first_error_interface_protocol', field: 'first_error_interface_protocol', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_error_message', field: 'first_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_error_time', field: 'first_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'first_error_cause', field: 'first_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_error_interface_protocol', field: 'last_error_interface_protocol', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_error_message', field: 'last_error_message', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_error_time', field: 'last_error_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'last_error_cause', field: 'last_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_error_interface_protocol', field: 'old_call_error_interface_protocol', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'old_call_error_cause', field: 'old_call_error_cause', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'Interval_Equipment',
      children: [
        { headerName: 'interval_first_enb_id', field: 'interval_first_enb_id', width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_enb_ip', field: 'interval_first_enb_ip', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_cell_id', field: 'interval_first_cell_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_enb_plmn', field: 'interval_first_enb_plmn', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_tac', field: 'interval_first_tac', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_enb_c_uid', field: 'interval_first_enb_c_uid', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'interval_first_enb_vlan_id', field: 'interval_first_enb_vlan_id', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    },
    {
      headerName: 'Interval_Usage',
      children: [
        { headerName: 'interval_call_start_time', field: 'interval_call_start_time', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'imsi_original', field: 'imsi_original', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
        { headerName: 'mme_id_original', field: 'mme_id_original', width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
      ]
    }
  ];

  export { callLogCols }
