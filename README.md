# Web_Project_Python


    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Kanit', sans-serif;
        }

        body {
            min-height: 100vh;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 40px;
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .image-section {
            flex: 1;
            min-width: 300px;
        }

        .image-section img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }

        .content-section {
            flex: 1;
            padding: 20px;
        }

        p {
            margin: 15px 0;
            line-height: 1.6;
        }

        ul {
            list-style: none;
            margin-left: 20px;
        }

        li {
            margin: 8px 0;
            position: relative;
        }

        li::before {
            content: "-";
            position: absolute;
            left: -15px;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
                padding: 20px;
            }

            .image-section {
                min-width: 100%;
            }

            .content-section {
                padding: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-section">
            <img src="path-to-your-image.jpg" alt="Python Comments Website">
        </div>
        <div class="content-section">
            <p>รูปแบบของเว็บไซต์ : Single Page Website</p>
            <p>ประเภทของ Responsive : Fluid Layout with Breakpoints</p>
            <p>ภาษาที่ใช้ในการพัฒนาเว็บ : HTML, CSS, JS</p>
            <p>หัวข้อเรื่องที่ได้รับมอบหมาย : Python Comments</p>
            <p>ประเภทของเว็บไซต์ : เว็บไซต์การศึกษา</p>
            <p>SEO Web : เว็บไซต์มีการตอบสนอง ต่อระบบ SEO</p>
            
            <p>ลูกเล่น และเอฟเฟกต์ของเว็บไซต์ :</p>
            <ul>
                <li>Darklight Mode</li>
                <li>Loading Animation</li>
                <li>Nav Dots Button</li>
                <li>Matrix Rain Effect</li>
            </ul>
            
            <p>ลักษณะของเว็บไซต์ :</p>
            <p>เป็นเว็บไซต์ที่อ่านง่ายเข้าใจง่าย สบายตา และเว็บไซต์ถูกออกแบบให้รองรับการใช้งานบนทุกขนาดหน้าจอ (เช่น เดสก์ท็อป แท็บเล็ต และมือถือ) มีการจัดวางองค์ประกอบของเว็บไซต์ที่เหมาะสม เช่น บทความ ส่วนการติดต่อ และเนื้อหาอื่น ๆ ปรับตามขนาดของหน้าจอ</p>
        </div>
    </div>

