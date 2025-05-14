export type Contact = {
    email: string
    phone: string
    form: {
        namePlaceholder: string
        emailPlaceholder: string
        subjectPlaceholder: string
        messagePlaceholder: string
        buttonText: string
    }
}
const contact: Contact = {
    email: "contact@sheikh-name.com",
    phone: "+966 12 345 6789",
    form: {
        namePlaceholder: "أدخل اسمك الكامل",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        subjectPlaceholder: "أدخل موضوع الرسالة",
        messagePlaceholder: "أدخل نص الرسالة",
        buttonText: "إرسال الرسالة"
    }
}

export default contact
