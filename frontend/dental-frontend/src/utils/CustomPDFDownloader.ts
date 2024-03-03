import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const CustomerPDFDownloader=({component, fileName})=>{
    const downloadPDF=async()=>{
        const canvas =await html2canvas(component.current);
        const imgData=canvas.toDataURL("image/png");
        const pdf = new jsPDF("p","mm","a4");
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=(imgProps.height * pdfWidth)/ imgProps.width;
        

    };

}