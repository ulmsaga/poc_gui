package com.mobigen.cdev.poc.module.nw.process;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NwCongifDemonAwaken implements Runnable {

    private final NwConfigDemon nwConfigDemon;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private volatile boolean isRun = false;
    private volatile int nwConfigDemonFailCnt = 0;
    @SuppressWarnings("FieldCanBeLocal")
    private final int MAX_FAIL_CNT = 10;
    @SuppressWarnings("FieldCanBeLocal")
    private final int THREAD_SLEEP = 60000;

    public NwCongifDemonAwaken(NwConfigDemon nwConfigDemon) {
        this.nwConfigDemon = nwConfigDemon;
    }

    public boolean isRun() {
        return isRun;
    }

    public void setRun(boolean run) {
        isRun = run;
    }

    @SuppressWarnings({"AccessStaticViaInstance", "BusyWait", "NonAtomicOperationOnVolatileField"})
    @Override
    public void run() {
        try {
            while (isRun) {
                Thread.currentThread().sleep(THREAD_SLEEP);
                if (!nwConfigDemon.isRun()) {
                    nwConfigDemonFailCnt++;
                    nwConfigDemon.setRun(true);
                    Thread demon = new Thread(nwConfigDemon);
                    boolean demonIsAlive = demon.isAlive();
                    if (!demonIsAlive) demon.start();

                    if (nwConfigDemonFailCnt > MAX_FAIL_CNT) {
                        logger.info("NwConfigDemon was shutdown {} times by exception.", nwConfigDemonFailCnt);
                    }
                } else {
                    logger.debug("NwConfigDemonAwaken is tried and NwConfigDemon' status is OK!!");
                }
            }
        } catch (Exception e) {
            isRun = false;
            e.printStackTrace();
            logger.info("NwConfigDemonAwaken is dead by exception");
        }
    }
}
