

class DurationDateUtil{

    getDurationDateDisplayString(dateInDays) {
        let dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + parseInt(dateInDays.replace(' ', '')));

        let date = dateObj.getDate();
        date = date < 10 ? "0" + date : date;

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

module.exports = new DurationDateUtil();
