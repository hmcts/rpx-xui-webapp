

class WorkAllocationDateUtil{



    getDurationDateDisplayString(dateInDays) {
        return this.getDateFormat_D_Month_YYYY(dateInDays);
    }

    getTaskDueDateDisplayString(dateInDays){
        return this.getDateFormat_D_Month_YYYY(dateInDays);
    }


    getTaskCeateDateDisplayString(dateInDays){
        return this.getDateFormat_D_Month_YYYY(dateInDays);
    }



    getDateFormat(dateInDays,format) {
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + parseInt(dateInDays.replace(' ', '')));
        let date = dateObj.getDate();

        if (format === "DD MONTH YYYY"){
            date = date < 10 ? "0" + date : date;

            let month = dateObj.getMonth();
            month = this.getFullMonth(month + 1);

            let year = dateObj.getFullYear();
            return `${date} ${month} ${year}`
        }

        if (format === "DD/MM/YYYY"){
            date = date < 10 ? "0" + date : date;

            let month = dateObj.getMonth();

            let year = dateObj.getFullYear();
            return `${date}/${month+1}/${year}`
        }

        return date
       
    }

    getDateInDays(dateInDays){
        let dateObj = new Date();
        dateObj.setHours(0)
        dateObj.setMinutes(0)
        dateObj.setSeconds(0)
        dateObj.setDate(dateObj.getDate() + parseInt(dateInDays.replace(' ', '')));
        return dateObj; 
    }

    getDateFormat_DD_Month_YYYY(dateInDays){
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + parseInt(dateInDays.replace(' ', '')));

        let date = dateObj.getDate();
        date = date < 10 ? "0" + date : date;

        let month = dateObj.getMonth();
        month = this.getFullMonth(month + 1);

        let year = dateObj.getFullYear();
        return `${date} ${month} ${year}`
    }

    getDateFormat_D_Month_YYYY(dateInDays) {
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + parseInt(dateInDays.replace(' ', '')));

        let date = dateObj.getDate();

        let month = dateObj.getMonth();
        month = this.getFullMonth(month + 1);

        let year = dateObj.getFullYear();
        return `${date} ${month} ${year}`
    }

    getFullMonth(monthNum) {
        let month = "";
        switch (monthNum) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                throw new Error("not a valid month number");
        }
        return month;
    }
}

module.exports = new WorkAllocationDateUtil();
