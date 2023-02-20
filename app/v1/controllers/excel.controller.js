const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/session.model');
const register = require('../models/register.model')
let xlsx = require("json-as-xlsx")
const excel = require("exceljs");

exports.exportDataToExcel = async (req, res) => {

    if (true || req.query.from && req.query.to) {
        register.filterUsers({ createdAt: { $gte: new Date("2023-01-01" + "T00:00:00.000Z"), $lte: new Date("2023-02-02"+ "T23:59:00.000Z") } }, (err, data) => {
            // console.log(data);
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Tutorials");
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Phone Number", key: "phoneNumber", width: 25 },
                { header: "Email", key: "_id", width: 25 },
                { header: "Registered On", key: "createdAt", width: 25 },
            ];
            worksheet.addRows(data);
            worksheet.eachRow(function(row, rowNumber) {
                worksheet.getRow(1).font = { name: 'Calibri', family: 6, size: 12, bold: '3', };
                worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
                // console.log(row.values[1].toLowerCase()==(row.values[3].toLowerCase().split("@")[0]))
                if(row.values[1].toLowerCase()==(row.values[3].toLowerCase().split("@")[0]))
           {     row.eachCell({ includeEmpty: false }, function(cell, colNumber) {
                    console.log(rowNumber,cell.address , colNumber + ' = ' + cell.value);
                    worksheet.getCell("C"+rowNumber).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '8B0000' },
                        bgColor: { argb: '8B0000' },
                      };
                      worksheet.getCell("C"+rowNumber).font = {
                        color: { argb: 'FFFFFF' }
                      };
                  });}
              });
         
        //    console.log(worksheet.getRow())
            // let all= worksheet.getColumn(2).fill = {
            //     type: 'pattern',
            //     pattern: 'solid',
            //     fgColor: { argb: '00aae7' },
            //     bgColor: { argb: '00aae7' },
            //   };
            //   all.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }
            // all.eachCell((cell,value)=>{
            //     console.log(cell, value)
            // })       
    // Add Row and formatting
    // const titleRow = worksheet.addRow(["title"]);
    // console.log(titleRow)
    // titleRow.font = { name: 'Calibri', family: 6, size: 20, underline: 'none', color: { argb: "FFFFFF" }, };
    // worksheet.addRow([]);
    // // worksheet.mergeCells('A1:O3');
    // titleRow.eachCell((cell1) => {
    //   cell1.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     bgColor: {},
    //     fgColor: { argb: '000000' }
    //   }

    // })
    // titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }

    // // Add Header Row
    // const headerRow = worksheet.addRow("headers");
    // headerRow.eachCell((cell, number) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: '00aae7' },
    //     bgColor: { argb: '00aae7' },
    //   };
    //   cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    //   worksheet.getColumn(number).width = 15
    //   worksheet.getColumn(1).width = 5;
    //   worksheet.getColumn(2).width = 10;
    //   worksheet.getColumn(3).width = 50;
    //   // worksheet.getColumn(4).width = 40;
    //   worksheet.getColumn(6).width = 20;
    //   // worksheet.getColumn(9).width = 10;
    //   worksheet.getColumn(10).width = 50;
    //   worksheet.getColumn(11).width = 30;
    //   worksheet.getColumn(12).width = 20;
    //   worksheet.getColumn(15).width = 50;
    //   headerRow.height = 30;
    //   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    // });

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "user.xlsx"
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        })
    }
    else {
        register.retrive({}, (err, data) => {
            console.log(data);
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Tutorials");
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Phone Number", key: "phoneNumber", width: 25 },
                { header: "Email", key: "_id", width: 25 },
                { header: "Registered On", key: "createdAt", width: 20 },
            ];
            worksheet.addRows(data);
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "user.xlsx"
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        })
    }
}

// exports.exportDataToExcel()