const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {

  const kelas = req.body.queryResult.parameters.kelas || "10";

  const today = new Date();
  const days = ["minggu","senin","selasa","rabu","kamis","jumat","sabtu"];
  const hari = days[today.getDay()];

  const jadwal = {
    senin: [
      "07.00 - 08.00 : Matematika",
      "08.00 - 09.00 : Bahasa Indonesia",
      "09.30 - 10.30 : PJOK"
    ],
    selasa: [
      "07.00 - 08.00 : Bahasa Inggris",
      "08.00 - 09.00 : Biologi",
      "09.30 - 10.30 : Sejarah"
    ],
    rabu: [
      "07.00 - 08.00 : Fisika",
      "08.00 - 09.00 : Kimia",
      "09.30 - 10.30 : Informatika"
    ],
    kamis: [
      "07.00 - 08.00 : Ekonomi",
      "08.00 - 09.00 : Sosiologi",
      "09.30 - 10.30 : Geografi"
    ],
    jumat: [
      "07.00 - 08.00 : Agama",
      "08.00 - 09.00 : PPKN"
    ]
  };

  let responseText = "";

  if (jadwal[hari]) {
    responseText = `📅 Jadwal kelas ${kelas} hari ${hari}:\n\n${jadwal[hari].join("\n")}`;
  } else {
    responseText = "Hari ini tidak ada jadwal pelajaran.";
  }

  res.json({
    fulfillmentText: responseText
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
