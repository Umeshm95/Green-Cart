import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
        },
        {
            title: "Need help?",
            links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <footer className="bg-primary/30 rounded-2xl mt-12 py-6 w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 py-12 border-b border-gray-200 text-gray-700">
                    <div className="md:w-1/3">
                        <img className="w-36" src={assets.logo} alt="GreenCart" />
                        <p className="max-w-[420px] mt-6 text-gray-600">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 w-full md:pl-50 md:w-2/3">
                        {linkSections.map((section, index) => (
                            <div key={index} className="min-w-[140px]">
                                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                                <ul className="text-sm space-y-1 text-gray-600">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href="#" className="hover:underline transition">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="py-6 text-center text-sm text-gray-600/90">
                    Copyright 2025 © GreenCart All Right Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;