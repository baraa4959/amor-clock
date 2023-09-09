const scheduleData = [
    { startTime: "6:45 صباحًا", classNumber: "طابور الصباح", endTime: "7:00 صباحًا" },
    { startTime: "7:00 صباحًا", classNumber: "الأولى", endTime: "7:50 صباحًا" },
    { startTime: "7:50 صباحًا", classNumber: "الثانية", endTime: "8:40 صباحًا" },
    { startTime: "8:40 صباحًا", classNumber: "الثالثة", endTime: "9:30 صباحًا" },
    { startTime: "9:30 صباحًا", classNumber: "الفسحة", endTime: "9:50 صباحًا" },
    { startTime: "9:50 صباحًا", classNumber: "الرابعة", endTime: "10:40 صباحًا" },
    { startTime: "10:40 صباحًا", classNumber: "الخامسة", endTime: "11:30 صباحًا" },
    { startTime: "11:30 صباحًا", classNumber: "السادسة", endTime: "12:20 صباحًا" },
    { startTime: "12:20 صباحًا", classNumber: "السابعة", endTime: "1:10 مساءً" },
    // يمكنك إضافة المزيد من الحصص هنا
];

// تحويل الأوقات إلى الأرقام العربية قبل كتابتها
const scheduleDataArabic = scheduleData.map(item => ({
    startTime: convertToArabicNumbers(item.startTime),
    classNumber: convertToArabicNumbers(item.classNumber),
    endTime: convertToArabicNumbers(item.endTime),
}));

const startTimesList = document.getElementById('start-times');
const classNumbersList = document.getElementById('class-numbers');
const endTimesList = document.getElementById('end-times');

scheduleDataArabic.forEach(item => {
    const startTimeItem = document.createElement('li');
    const classNumberItem = document.createElement('li');
    const endTimeItem = document.createElement('li');

    startTimeItem.innerText = item.startTime;
    classNumberItem.innerText = item.classNumber;
    endTimeItem.innerText = item.endTime;

    startTimesList.appendChild(startTimeItem);
    classNumbersList.appendChild(classNumberItem);
    endTimesList.appendChild(endTimeItem);
});

function convertToArabicNumbers(input) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    return input.replace(/[0-9]/g, function (match) {
        return arabicNumbers[parseInt(match)];
    });
}


function updateTimeAndDate() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    let timeOfDay = "";

    if (currentHour >= 0 && currentHour < 12) {
        timeOfDay = "باحًا";
    } else {
        timeOfDay = "ساءً";
    }

    const formattedTime = currentTime.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long' }).format(currentTime);
    const arabicDate = convertToArabicNumbers(hijriDate.replace(/،/g, ''));

    const classTimes = [
        { startTime: "6:45 صباحًا", classNumber: "طابور الصباح", endTime: "7:00 صباحًا" },
        { startTime: "7:00 صباحًا", classNumber: "الحصة الأولى", endTime: "7:50 صباحًا" },
        { startTime: "7:50 صباحًا", classNumber: "الحصة الثانية", endTime: "8:40 صباحًا" },
        { startTime: "8:40 صباحًا", classNumber: "الحصة الثالثة", endTime: "9:30 صباحًا" },
        { startTime: "9:30 صباحًا", classNumber: "الحصة الفسحة", endTime: "9:50 صباحًا" },
        { startTime: "9:50 صباحًا", classNumber: "الحصة الرابعة", endTime: "10:40 صباحًا" },
        { startTime: "10:40 صباحًا", classNumber: "الحصة الخامسة", endTime: "11:30 صباحًا" },
        { startTime: "11:30 صباحًا", classNumber: "الحصة السادسة", endTime: "12:20 صباحًا" },
        { startTime: "12:20 صباحًا", classNumber: "الحصة السابعة", endTime: "13:10 صباحًا" }
    ];



    // التحقق من ما إذا كان الوقت الحالي بين startTime و endTime
    let remainingTimeText = "وقت غير متوقع";
    let isTimeExpected = false;

    for (const classTime of classTimes) {
        const startTimeParts = classTime.startTime.split(":");
        const endTimeParts = classTime.endTime.split(":");
        const startHour = parseInt(startTimeParts[0]);
        const startMinute = parseInt(startTimeParts[1]);
        const endHour = parseInt(endTimeParts[0]);
        const endMinute = parseInt(endTimeParts[1]);

        if (
            (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
        ) {
            // الوقت الحالي بين startTime و endTime
            const remainingTime = new Date(currentTime);
            remainingTime.setHours(endHour, endMinute, 0, 0); // تعيين الساعة النهائية
            const timeDiff = remainingTime - currentTime;
            const hoursDiff = Math.floor(timeDiff / 3600000); // تحويل الفارق إلى ساعات
            const minutesDiff = Math.floor((timeDiff % 3600000) / 60000); // تحويل الفارق إلى دقائق
            const secondsDiff = Math.floor((timeDiff % 60000) / 1000); // تحويل الفارق إلى ثواني
            if (minutesDiff == 0){
                remainingTimeText = `${convertToArabicNumbers(secondsDiff.toString())} ثانية متبقية على نهاية ${classTime.classNumber}`;

            }else{
                remainingTimeText = `${convertToArabicNumbers(minutesDiff.toString())} دقيقة متبقية على نهاية ${classTime.classNumber}`;
            }
            isTimeExpected = true;
            break;
        }
    }

    const rightHalfElement = document.querySelector('.right-half');

    const noteElement = document.querySelector('.note');

    noteElement.textContent = `${remainingTimeText}`;
    
    const timeElement = document.querySelector('.time h1');
    const dateElement = document.querySelector('.time p:nth-child(2)');


    timeElement.textContent = `${formattedTime}${timeOfDay}`;
    dateElement.textContent = `${arabicDate}`;

    if (isTimeExpected) {
        noteElement.textContent = `${remainingTimeText}`;
        noteElement.style.display = 'block';
        rightHalfElement.style.display = 'flex';
    } else {
        noteElement.style.display = 'none';
        rightHalfElement.style.display = 'none';
    }

}



// تحديث الوقت والتاريخ كل ثانية (1000 مللي ثانية)
setInterval(updateTimeAndDate, 1000);

// الآن يجب علينا أن نستدعي هذه الوظيفة مرة واحدة عند تحميل الصفحة لعرض الوقت والتاريخ الحالي
updateTimeAndDate();


function getHijriDate(date) {
    const gDate = date.getDate();
    const gMonth = date.getMonth() + 1;
    const gYear = date.getFullYear();
    return `${toHijri(gDate, gMonth, gYear)}`;
}

function toHijri(gDate, gMonth, gYear) {
    const g = gYear - 1600;
    const g2 = (g - (g % 303)) / 303;
    let gDay = (g % 303) + 361 * (g % 360) + 32075;
    let hYear = 10631 / 30;
    let whole = Math.floor(gDay / hYear);
    gDay = gDay % hYear;
    hYear = 30 + (gDay >= 10631 ? 1 : 0);
    const hMonth = Math.floor((gDay - 29) / 354);
    const hDay = gDay - 1 - 354 * hMonth - (hMonth > 5 ? 30 : 29);

    return `اليوم ${hDay}/${hMonth + 1}/${whole + 1}`;
}

// تحديث الوقت والتاريخ كل ثانية (1000 مللي ثانية)
setInterval(updateTimeAndDate, 1000);

// الآن يجب علينا أن نستدعي هذه الوظيفة مرة واحدة عند تحميل الصفحة لعرض الوقت والتاريخ الحالي
updateTimeAndDate();

function time(remainingTime, currentTime){

}