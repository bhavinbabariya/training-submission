const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

const products = [
    {
        id: 1,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT_muVX9uQJCu8iYdomSdI4bRRmZJY8ELVv7AWcnoA7bAm_cJ8j9iqlob-V9BfgeT9ENtlayWorZGITE6CA_EM2GDx51_wHOwJUIQGGsutjmyIkxoIbwNM4vw&usqp=CAE",
        name: "Leather Wallet",
        description:
            "A sleek and stylish leather wallet with multiple compartments for cards and cash.",
    },
    {
        id: 2,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQx5wAL-X8VCZ5ULPG3KOT94_BO5ObMOFA97NqE3IX3a2GCYvWVoW7SUo_bFXnPMGpUoqed_FxXG3Q9KSO_omusP1E0nadAyAmpLRToJJ4kFetCJqsQuFKx&usqp=CAE",
        name: "Wireless Earbuds",
        description:
            "True wireless earbuds with Bluetooth 5.0, up to 6 hours of battery life, and touch controls.",
    },
    {
        id: 3,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRVMLp5-4wA4bcA71ewalsNQW0L4Hf7cB5-zkvj3Ozl3rg_iNk4XWzM7O8sCrLuh7NjIub5OniyGzg5XPmsp58RncnOEZnogmT-nTjQSBjbiv1caWTDftPx&usqp=CAE",
        name: "Smartwatch",
        description:
            "Smartwatch with heart rate monitoring, GPS, and up to 10 days of battery life.",
    },
    {
        id: 4,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRRX60meZSfyrXgNpD47Nw6sJ8ixde_Pcn-3YYJkSgXydNvRkgel311InwX-yoLjB4aD25IQnifbbtx4Ujs2Qeopolu1OrGik-Pt2YAYvH4Mi_5Dq-5f_f7&usqp=CAE",
        name: "Bluetooth Speaker",
        description:
            "Portable Bluetooth speaker with 360-degree sound, waterproof design, and up to 12 hours of battery life.",
    },
    {
        id: 5,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRgZi8Ffc8qNEmvzwvt7op15I4rteKj1arjZfobZyg3u1erk3jC8yT-trO2ym9XFtv64-tphCmPRFkPHHBkFCk0Q5XfA0pJ-1zefjJeCPMa9eGxUCypuaWP&usqp=CAE",
        name: "Instant Camera",
        description:
            "Instant camera with built-in flash, selfie mirror, and automatic exposure control.",
    },
    {
        id: 6,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTtKhMQKkWCld2w7UzFo--GRFa5gxZ9H713lusSx6mpi8sodN5DqXofATdBQRdLRALpLBtYxttWg6YzqdxM_kSp7I-ew1VAZYqWtMmfCKyxfSSQGZaedo0Y&usqp=CAE",
        name: "Air Purifier",
        description:
            "Air purifier with true HEPA filter, three fan speeds, and quiet operation.",
    },
    {
        id: 7,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUYirrHHc3Px85g12SKmrdrRdZHe-9jQgi8mIy1p4M4-AW7C4bMmxPOpjaGtc6vAU3AG-L-v6yF-zimq2upByUlCMjB7mPD7rV6mLHUOC1MF3aa2ry1fYDoA&usqp=CAE",
        name: "Electric Toothbrush",
        description:
            "Electric toothbrush with multiple brushing modes, pressure sensor, and two weeks of battery life.",
    },
    {
        id: 8,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRL4heQYHbNo2yNh_yrqlA83rWrWECtZfwG-5sXIFhO0o7ciIjp5XpPR-T-p7wmzFKRo542vLNdlS2U7EXtitHjvvCjZlM5PfxTBADvKLPB4ddkZFzomAHSoQ&usqp=CAE",
        name: "Smart Thermostat",
        description:
            "Smart thermostat with voice control, Wi-Fi connectivity, and energy-saving features.",
    },
];

app.get("/", (req, res) => {
    res.render("home", { products: products });
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    console.log("Contact form : ", req.body);
    res.render("success", {
        success: true,
        message: "Form has been submitted successfully",
    });
});
app.listen(3000, () => [console.log("App is listning on port : 3000 ")]);
