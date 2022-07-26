import {useRef, useState, useEffect} from "react";
import "./LinkAnalysis.css";

// const DOMMY_DATA = {
//   "سلامت خانواده": {
//       "page_rank": {
//           "tops": [
//               "جوش شیرین به عنوان شامپو خشک: اگر پوست سرتان خیلی چرب است و زمانی برای شستن موها ندارید، می‌توانید به سادگی از جوش شیرین استفاده کنید و مصرف محصولات مضر حاوی مواد شیمیایی را کاهش دهید.",
//               "برای اینکه بتوانید در طول روز انرژی بیشتری داشته باشید و انرژی خود را صرف کارهای خلاقانه کنید لازم است از میوه جات و سبزیجات زیادی در رژیم غذاییتان استفاده کنید تا تاثیرات آن را روی بدن تان ببینید.",
//               "درست است که هفته‌ای یک بار دویدن و روزی نیم ساعت پیاده رفتن عمر شما را طولانی می‌کند اما محققان می‌گویند اگر تنها ۳۰دقیقه زمان ثابت را به ورزش کردن اختصاص دهید، عمرتان ۱۵سال طولانی‌تر می‌شود."
//           ],
//           "bottoms": [
//               "به تعویق انداختن زمان بیولوژیک بدن، از لحاظ علمی امکان پذیر است.",
//               "پیاده روی بهترین روش فعالیت کردن برای افراد سالمند است.",
//               "این در حالی است که بی تحرکی برای سلامت آنها بسیار مضر بوده و باید ساعاتی را از منزل خارج شوند."
//           ]
//       },
//       "hits": {
//           "Authorities": {
//               "tops": [
//                   "جایگزین کردن مواد شوینده با جایگزین کردن و استفاده از مواد شوینده دوستدار محیط زیست می‌توانید میزان آلودگی هوای داخل خانه را کاهش داده، خطر ابتلا به بیماریهای آسم و آلرژی را کم کنید.",
//                   "این کار ساده از انتشار آلودگی‌های بیرون مانند آلودگی‌های ناشی از خودروها، مواد شیمیایی و افت کش‌ها در داخل خانه جلوگیری می‌کند.",
//                   "فراموش نکنید که اصلا از جاروبرقی برای تمیز کردن محل استفاده نکنید چراکه باعث پخش آلودگی در هوای محیط شود."
//               ],
//               "bottoms": [
//                   "عامل مشخصی خواب شما را مختل می‌کند: صدای دزدگیر ماشین همسایه، فرزندی که در حال دندان درآوردن است، استفاده از داروهای استروئیدی، نگرانی‌های شغلی و … هیچ کس دوست ندارد خوابش را از دست بدهد.",
//                   "این متخصص داخلی در پایان از همه افراد خواست تا با توجه به این مسئله بیش از پیش هوای پدران را داشته و سعی کنند در زمینه استفاده از کولر شرایط فیزیولوژیکی بدن آنها را در نظر بگیرند.",
//                   "رنگ لعابی پودری را روی نشاسته بپاشید و بگذارید کودک ترکیب رنگ‌‌ها را تجربه کند."
//               ]
//           },
//       }
//   }
// }

const LinkAnalysis = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isHitsSelected, setIsHitsSelected] = useState(false);
    const [data, setData] = useState({});
    const methodInputRef = useRef();
    const hitsInputRef = useRef();

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        fetchData();
        setIsFormSubmitted(true);
    };

    const fetchData = async () => {
        const hitsType = methodInputRef.current.value == "hits" ? `&type=${hitsInputRef.current.value}` : '';
        const response = await fetch(
            `http://127.0.0.1:8000/api/v1/article/link_analyser/?algorithm=${methodInputRef.current.value}${hitsType}`
        );
        const json = await response.json();
        setData(json);
    };

    const selectHits = () => {
        if (document.getElementById('linkmethod').value === 'hits') {
            setIsHitsSelected(true);
        }else {
            setIsHitsSelected(false);
        }
    };
    
    let rows = [];
    if (data && data.citationCount) {
        for (let i = 0; i < Object.keys(data.citationCount).length; i++) {
            rows.push(<div style={{"borderBottom": "1px solid #ddd", "direction": "ltr", "padding": "8px"}} key={i}>
                <a href={data.url[i]}>{i+1}. {data.title[i]}</a>
                <br></br>
                <span style={{"fontSize": "14px", "color": "#9b59b6"}}>Refrence Count: {data.referenceCount[i]}</span>
                <br></br>
                <span style={{"fontSize": "14px", "color": "#2980b9"}}>Citation Count: {data.citationCount[i]}</span>
            </div>);
        }
    }

    return (
        <>
            <div className="form_container">
                <form onSubmit={formSubmissionHandler}>
                    <label>Method</label>
                    <select onChange={selectHits} ref={methodInputRef} id="linkmethod" name="method">
                        <option value="pagerank">Page Rank</option>
                        <option value="hits">Hits</option>
                    </select>
                    {isHitsSelected && (
                        <select className="hits-selection" ref={hitsInputRef}>
                            <option value="authorities">Authorities</option>
                            <option value="hubs">Hubs</option>
                        </select>
                    )}
                    <button type='submit'>submit</button>
                </form>
            </div>
            {isFormSubmitted && (
                <>
                    <div className='link-analysis_container'>
                        <h4 className="link-analysis_title">Most important papers</h4>
                        <div className="sentences_container">
                            {rows}
                        </div>
                    </div>
                </>
            )}
        </>
    )

};

export default LinkAnalysis;
