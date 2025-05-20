export interface SheikhInfo {
    name: string
    bio: string[]
    location: string
    birth: string
    email: string
    phone: string
    image: string
    twitter: string
}
const sheikh: SheikhInfo = {
    name: "الشيخ عبد العزيز الراجحي",
    twitter: "Moh1Rz2H3",
    bio: [
        "ولد الشيخ في مدينة الرياض عام 1370هـ الموافق 1950م، ونشأ في أسرة عُرفت بالعلم والصلاح...",
        "انتقل بعد ذلك للدراسة في كلية الشريعة بجامعة الإمام محمد بن سعود الإسلامية...",
        "عمل الشيخ في التدريس الجامعي، وتولى عدة مناصب أكاديمية..."
    ],
    location: "الرياض، المملكة العربية السعودية",
    birth: "مواليد 1370هـ / 1950م",
    email: "contact@sheikh-name.com",
    phone: "+966 12 345 6789",
    image: "/logo.png"
}

export default sheikh
