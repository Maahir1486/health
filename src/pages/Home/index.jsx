import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Activity, BrainCircuit } from 'lucide-react';
import heroImage from '../../assets/Hrithik.jpg';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl font-heading">
                            Your Campus <span className="text-primary-600">Health & Wellness</span> Hub
                        </h1>
                        <p className="mt-6 text-lg tracking-tight text-slate-600">
                            Access mental health support and nutrition advice tailored for students. Manage stress and prioritize your well-being.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                to="/login"
                                className="rounded-full bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:shadow-lg hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Get Started
                            </Link>
                            <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-primary-600 transition-colors">
                                Explore Features <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <img
                                src={heroImage}
                                alt="Students doing fitness activities"
                                className="w-[50rem] rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-slate-50 rounded-3xl mb-24">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Holistic Care</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-heading">
                        Everything you need for student well-being
                    </p>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        A comprehensive approach to campus health. We focus on the three pillars of student wellness.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <BrainCircuit className="h-8 w-8 text-primary-600 flex-none" />
                                Mental Health
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">Access professional counseling, guided meditation sessions, and stress-management resources designed for academic pressure.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                <HeartPulse className="h-8 w-8 text-primary-600 flex-none" />
                                Nutrition Advice
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                <p className="flex-auto">Discover healthy meal-prepping guides that are budget-friendly. Eating right doesn't have to mean breaking the bank.</p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Home;
