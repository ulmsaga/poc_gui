package com.mobigen.cdev.poc.module.nw.process;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NwAlarmDemonAwaken implements Runnable {

    private final NwAlarmDemon nwAlarmDemon;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private volatile boolean isRun = false;
    private volatile int nwAlarmDemonFailCnt = 0;
    @SuppressWarnings("FieldCanBeLocal")
    private final int MAX_FAIL_CNT = 10;
    @SuppressWarnings("FieldCanBeLocal")
    private final int THREAD_SLEEP = 60000;

    public NwAlarmDemonAwaken(NwAlarmDemon nwAlarmDemon) {
        this.nwAlarmDemon = nwAlarmDemon;
    }

    public boolean isRun() {
        return isRun;
    }

    public void setRun(boolean run) {
        isRun = run;
    }

    @Override
    public void run() {
        try {
            while (isRun) {
                Thread.currentThread().sleep(THREAD_SLEEP);
                if (!nwAlarmDemon.isRun()) {
                    nwAlarmDemonFailCnt++;
                    nwAlarmDemon.setRun(true);
                    Thread demon = new Thread(nwAlarmDemon);
                    boolean demonIsAlive = demon.isAlive();
                    if (!demonIsAlive) demon.start();

                    if (nwAlarmDemonFailCnt > MAX_FAIL_CNT) {
                        logger.info("nwAlarmDemon was shutdown {} times by exception.", nwAlarmDemonFailCnt);
                    }
                } else {
                    logger.debug("nwAlarmDemonAwaken is tried and nwAlarmDemon' status is OK!!");
                }
            }
        } catch (Exception e) {
            isRun = false;
            e.printStackTrace();
            logger.info("NwConfigDemonAwaken is dead by exception");
        }
    }
}
