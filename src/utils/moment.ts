import moment from "moment";


export function dateformat( date:any) {
 return moment(date).format("DD/MM/YYYY");
}

