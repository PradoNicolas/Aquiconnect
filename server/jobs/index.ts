import cron from 'node-cron'
import { CronJob } from './CronJobType'
let cronJobs:CronJob[] = []

import LoteJobs from './LoteJobs'
cronJobs = cronJobs.concat(LoteJobs)

function setupCron(cronJobs:CronJob[]){
    cronJobs.forEach(cronJob => {
        cron.schedule(cronJob.moment, cronJob.function)
    })
}

export default () => setupCron(cronJobs)