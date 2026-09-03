// =====================================
// KONFIGURASI DATABASE
// =====================================

const SHEET_NAME = "Sheet1";


// =====================================
// MENGAMBIL LEADERBOARD
// =====================================

function doGet() {

    const sheet =
        SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(
            SHEET_NAME
        );


    const lastRow =
        sheet.getLastRow();


    // JIKA BELUM ADA DATA

    if (

        lastRow <= 1

    ) {

        return ContentService

            .createTextOutput(

                JSON.stringify([])

            )

            .setMimeType(

                ContentService
                    .MimeType
                    .JSON

            );

    }


    // AMBIL DATA

    const data =
        sheet
        .getRange(

            2,

            1,

            lastRow - 1,

            4

        )
        .getValues();


    const players =
        data.map(

            function(row) {

                return {

                    username:
                        String(
                            row[0]
                        ),

                    score:
                        Number(
                            row[2]
                        )

                };

            }

        );


    // URUTKAN BERDASARKAN SKOR

    players.sort(

        function(a, b) {

            return (
                b.score -
                a.score
            );

        }

    );


    // AMBIL TOP 20

    const leaderboard =
        players.slice(
            0,
            20
        );


    return ContentService

        .createTextOutput(

            JSON.stringify(
                leaderboard
            )

        )

        .setMimeType(

            ContentService
                .MimeType
                .JSON

        );

}


// =====================================
// MENYIMPAN DATA PEMAIN
// =====================================

function doPost(e) {

    try {

        const sheet =
            SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName(
                SHEET_NAME
            );


        const data =
            JSON.parse(

                e.postData.contents

            );


        // VALIDASI DATA

        if (

            !data.username ||
            !data.phone ||
            data.score === undefined

        ) {

            throw new Error(
                "Data tidak lengkap"
            );

        }


        // SIMPAN DATA

        sheet.appendRow([

            data.username,

            data.phone,

            Number(
                data.score
            ),

            new Date()

        ]);


        return ContentService

            .createTextOutput(

                JSON.stringify({

                    status:
                        "success",

                    message:
                        "Data berhasil disimpan"

                })

            )

            .setMimeType(

                ContentService
                    .MimeType
                    .JSON

            );

    }

    catch(error) {

        return ContentService

            .createTextOutput(

                JSON.stringify({

                    status:
                        "error",

                    message:
                        error.toString()

                })

            )

            .setMimeType(

                ContentService
                    .MimeType
                    .JSON

            );

    }

                  }
