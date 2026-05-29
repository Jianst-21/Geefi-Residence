import React from 'react';
import Header from "@/components/fasilitas/Header";
import FasilitasGrid from "@/components/fasilitas/FasilitasGrid";
import FasilitasUmum from "@/components/fasilitas/FasilitasUmum";
import FasilitasMap from "@/components/fasilitas/FasilitasMap";
import FasilitasCTA from "@/components/fasilitas/FasilitasCTA";
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

export const metadata = {
    title: 'Fasilitas | Geefi Residence',
    description: 'Fasilitas terbaik untuk keluarga di Geefi Residence',
};

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="w-full bg-white min-h-screen pt-10 pb-0 flex flex-col font-sans">
                <Header />
                <FasilitasGrid />
                <FasilitasUmum />
                <FasilitasMap />
                <FasilitasCTA />
            </div>
            <Footer />
        </>
    );
}
