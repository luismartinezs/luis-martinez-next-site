+++
title = "Dropping the framework barely sped up my app. Here's what did."
description = "AI agents built the same heavy dashboard with a framework and without one. Both ran at full speed. The real speedups came from somewhere else."
date = 2026-11-08

[extra]
tags = ["web performance", "ai agents", "experiments", "webassembly", "webgpu", "rust", "solid", "claude"]
category = "Development"
+++

*I had two AI agents build the same busy live dashboard: one with a normal framework, one with no framework at all, in Rust and raw graphics code. Would the framework version choke? It ran at full speed. The no-framework version was only a little more efficient, and the biggest speedups came from somewhere else entirely.*

**Tl,dr:**

- I started with a bold idea to test: once AI writes our code, the ready-made building blocks most web developers use only slow apps down.
- Two AI helpers built the same busy, fast-changing web page: one with those usual building blocks, one from scratch and tuned for speed.
- Both versions ran perfectly smoothly, as smooth as my screen can show.
- The from-scratch version did the same job with 13 to 18% less work, and was 9 times smaller to download. You could only see the difference on a computer I slowed down on purpose.
- The biggest speedups came not from picking tools but from fixing a few mistakes in how each version used the web browser.
- The surprise: when new AI helpers later added a feature, the from-scratch code cost about 40% less AI usage to change.

---

I started with a bold idea to test. Frameworks, TypeScript and JSON, it goes, exist to make code comfortable for *humans* to write. Once AI agents write the code, nobody needs that comfort anymore, so all of it is just overhead slowing your app down.

The idea came with a thought experiment: a dense, live trading dashboard. Built the normal way, it said, the page would stutter along at 8 to 15 <span class="term" tabindex="0" data-tip="Frames per second: how many new pictures the screen shows each second. Higher is smoother. Below about 30 starts to feel choppy; 8 is a slideshow.">frames per second</span>. Built with <span class="term" tabindex="0" data-tip="A fast systems programming language, popular for performance-critical code.">Rust</span>, <span class="term" tabindex="0" data-tip="WebAssembly (Wasm): a compact binary format browsers run at near-native speed. You compile languages like Rust into it.">WebAssembly</span> and raw <span class="term" tabindex="0" data-tip="The newest browser API for talking directly to the graphics card, both for drawing and for heavy number-crunching.">WebGPU</span>, with no frameworks at all, it would glide at 120.

I build web apps, so I wanted to know whether that's true. I set up an experiment where AI agents built that exact dashboard twice: once with tools a normal frontend team would pick, and once with the "no comfort, all speed" recipe. Then I measured both, carefully.

## The idea I wanted to test

**The idea: once AI writes the code, frameworks are pure overhead, so a busy dashboard would crawl at 8–15 frames per second with one and glide at 120 without.**

The idea hangs on a term you've probably heard: <span class="term" tabindex="0" data-tip="Developer experience: how pleasant, safe and quick your tools feel to work with. Autocomplete, types, components and hot reload are all DX.">DX</span>. Good DX is everything that makes code pleasant to write and read: components, types, readable data formats. Its opposite is "zero DX": code shaped purely for the machine, with no thought for the person reading it.

Its zero-DX recipe goes roughly like this:

- Write the heavy logic in Rust and compile it to WebAssembly.
- Skip the framework and write text straight into the page.
- Draw graphics with raw WebGPU instead of a library.
- Send data as compact binary instead of JSON.
- Keep the first download tiny.

The proposed demo is 2,000 live cells updating 60 times a second, on top of a simulation of 250,000 particles that react to the trades. The idea predicts that a standard stack drops to 8–15 fps, with <span class="term" tabindex="0" data-tip="JavaScript automatically frees memory you no longer use. While it does that, your code can be paused for a moment.">garbage-collection</span> pauses of 50–120 milliseconds every second or two. The optimized stack, it says, holds 120 fps.

Quick refresher on why those numbers matter. Your screen redraws itself many times a second. At 60 Hz the browser has about 16.7 ms to prepare each picture; at 120 Hz, about 8.3 ms. Miss that deadline and the screen shows the old picture again, which you feel as a stutter. At 8 fps, scrolling a table feels like flipping a flipbook.

## Making it a fair fight

**Two AI agents built the same dashboard, one with a framework and one without. Both tried hard to make it fast, under rules that stopped either side from cheating.**

The easy version of this experiment is rigged. Put a quickly written React app against a hand-tuned WebAssembly engine and of course the engine wins. But then you're measuring effort and expertise, not the tools.

So I asked a narrower question: **if both sides know the browser equally well, how much speed does the comfortable stack actually cost?**

Two AI agents, same model, same brief, each built one side. I'll call them the **framework build** and the **bare-metal build**.

<div class="versus">
  <div class="side">
    <h3>Framework build</h3>
    <p class="tag">Good DX, optimized</p>
    <ul>
      <li><span class="term" tabindex="0" data-tip="A JavaScript UI framework that looks like React, but updates only the exact bits of the page that changed instead of re-rendering whole components.">Solid</span>, strict TypeScript, a standard bundler.</li>
      <li>Graphics through <span class="term" tabindex="0" data-tip="The most popular JavaScript library for 3D graphics in the browser.">Three.js</span> on WebGPU, using its own shader system.</li>
      <li>The rule: <em>a typical senior frontend team would happily own this code.</em></li>
      <li>No hand-written WebAssembly. Grid text must update through the framework, with no sneaking around it.</li>
    </ul>
  </div>
  <div class="side c">
    <h3>Bare-metal build</h3>
    <p class="tag">Zero DX, optimized</p>
    <ul>
      <li>Rust compiled to WebAssembly for the data.</li>
      <li>Plain DOM, no framework, no libraries.</li>
      <li>Raw WebGPU with hand-written <span class="term" tabindex="0" data-tip="Small programs that run on the graphics card, usually once per pixel or per particle, thousands at a time.">shaders</span>.</li>
      <li>Starts from the original idea's design, but may change anything it can prove is faster. Readability is not a goal.</li>
    </ul>
  </div>
</div>

Then a few rules to keep things honest in both directions:

- **One referee.** A coordinating AI agent wrote the test setup, the spec and the correctness checks before either side started, and neither builder could touch them. The spec said outright that a tie is a valid result.
- **Same superpowers.** Both sides could use background <span class="term" tabindex="0" data-tip="Web Workers: background threads where JavaScript runs without blocking the page.">workers</span>, shared memory, WebGPU and WebAssembly. "Good DX" means comfortable, not handicapped.
- **Tricks get shared.** When one side found a browser-level trick, the referee could pass it to the other. The framework build got two ideas this way and gave one back. I wanted to measure the cost of the tools, not who had a lucky idea first.
- **Hostile code review.** Each side reviewed the other's code, hunting for rule breaks, cheating and missed speedups, then got one round to respond.
- **Wrong means failed.** Every run was checked for correct output. A fast wrong answer counted as a failure, not a fast result.
- **No peeking.** The two agents worked in parallel in separate copies of the repository and didn't see each other's code until review.

## The dashboard both sides built

**Both had to build the same demanding page: a live price grid next to a big particle simulation, updated every frame with no shortcuts.**

One page, two halves. Each half is a separate module with a fixed interface, so you can swap one side's half for the other's. That swapping turns out to be the most useful trick in the whole experiment.

<figure class="chart">
  <p class="fig-title">The test page</p>
  <p class="fig-sub">A sketch of what both builds had to draw, every frame.</p>
  <svg viewBox="0 0 720 380" role="img" aria-labelledby="app-t app-d" class="viz">
<title id="app-t">Sketch of the test dashboard</title><desc id="app-d">Left half: a particle simulation with 32 sector nodes on a ring of springs. Right half: a live price grid with flashing cells and tiny sparklines.</desc>
<rect x="0.5" y="0.5" width="719" height="379" rx="12" class="sk-frame"/>
<rect x="0.5" y="0.5" width="719" height="30" rx="12" class="sk-bar"/><rect x="0.5" y="18" width="719" height="13" class="sk-bar"/>
<circle cx="18" cy="16" r="4.5" fill="#e66767" opacity=".8"/>
<circle cx="34" cy="16" r="4.5" fill="#c98500" opacity=".8"/>
<circle cx="50" cy="16" r="4.5" fill="#199e70" opacity=".8"/>
<rect x="80" y="8" width="300" height="16" rx="8" class="sk-url"/>
<rect x="1" y="31" width="358" height="348" class="sk-sim" rx="0"/>
<circle cx="174.2" cy="102.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="195.6" cy="98.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="175.1" cy="89.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="174.6" cy="90.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="186.3" cy="92.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="183.4" cy="93.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="175.5" cy="93.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="181.3" cy="98.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="167.4" cy="78.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="174.0" cy="95.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="206.3" cy="87.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="177.7" cy="100.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="186.3" cy="99.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="183.8" cy="82.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="187.7" cy="107.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="172.3" cy="99.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="174.1" cy="89.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="181.0" cy="94.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="174.9" cy="80.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="174.0" cy="87.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="171.3" cy="93.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="172.4" cy="68.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="180.6" cy="107.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="186.5" cy="84.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.6" cy="80.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="207.6" cy="116.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.0" cy="92.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="170.6" cy="91.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="192.5" cy="94.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="160.9" cy="81.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="187.0" cy="84.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="163.0" cy="79.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="157.3" cy="78.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="188.2" cy="88.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="200.1" cy="102.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="202.6" cy="96.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="188.7" cy="81.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="203.7" cy="105.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="201.9" cy="104.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="200.1" cy="103.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="207.0" cy="106.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="205.0" cy="97.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="205.9" cy="103.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="214.7" cy="91.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="219.8" cy="110.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="209.7" cy="97.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="208.1" cy="94.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="195.8" cy="107.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="187.7" cy="122.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="218.2" cy="121.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="205.8" cy="104.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="193.0" cy="103.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="202.6" cy="101.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="201.6" cy="103.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="183.0" cy="125.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="198.9" cy="88.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="188.0" cy="100.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="218.7" cy="107.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="210.0" cy="98.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="212.7" cy="75.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="199.0" cy="106.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="200.7" cy="97.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="213.7" cy="105.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="207.4" cy="106.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="203.2" cy="104.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="205.6" cy="103.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="207.6" cy="104.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="207.4" cy="99.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="218.5" cy="100.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="218.7" cy="113.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="211.2" cy="120.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="244.1" cy="104.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="217.2" cy="106.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="226.5" cy="106.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="222.1" cy="108.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="238.4" cy="127.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="241.5" cy="107.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="228.6" cy="110.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="207.4" cy="100.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="229.1" cy="104.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="228.0" cy="101.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="216.7" cy="113.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="226.6" cy="108.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="227.7" cy="87.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="221.6" cy="110.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="249.8" cy="102.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="230.6" cy="97.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="222.9" cy="80.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="226.5" cy="119.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="227.8" cy="105.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="228.3" cy="105.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="220.3" cy="94.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="254.2" cy="96.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="236.4" cy="104.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="232.2" cy="103.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="225.8" cy="114.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="226.8" cy="112.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="240.2" cy="93.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="235.6" cy="87.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="225.8" cy="101.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="239.3" cy="114.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="229.7" cy="79.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="241.9" cy="101.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="242.7" cy="108.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="235.5" cy="122.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="214.2" cy="132.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="224.2" cy="123.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="246.2" cy="118.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="254.8" cy="124.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="250.6" cy="87.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="253.4" cy="126.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="223.0" cy="82.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="236.9" cy="118.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="246.0" cy="111.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="253.1" cy="109.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="255.5" cy="105.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="224.7" cy="118.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="246.7" cy="130.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="241.9" cy="115.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="232.2" cy="105.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="241.4" cy="119.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="246.4" cy="108.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="230.6" cy="125.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="247.3" cy="107.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="228.4" cy="118.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="232.5" cy="109.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="226.2" cy="108.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="243.4" cy="114.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="246.3" cy="111.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="232.4" cy="112.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="239.9" cy="98.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="235.9" cy="110.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="238.8" cy="109.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="234.5" cy="108.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="242.0" cy="116.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="217.9" cy="109.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="262.4" cy="130.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="237.2" cy="142.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="252.6" cy="120.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="265.0" cy="129.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="250.1" cy="136.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="270.7" cy="130.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="258.3" cy="109.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="264.5" cy="155.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="242.3" cy="122.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="272.9" cy="140.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="270.8" cy="136.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="266.1" cy="135.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="277.6" cy="137.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="283.4" cy="118.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.3" cy="137.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="278.8" cy="148.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="274.0" cy="124.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.6" cy="130.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="232.8" cy="156.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.5" cy="127.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="274.5" cy="145.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="261.4" cy="139.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.5" cy="142.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="286.7" cy="134.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="261.8" cy="130.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="264.5" cy="134.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="261.1" cy="127.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.3" cy="131.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="267.8" cy="124.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="265.6" cy="135.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.7" cy="132.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="274.3" cy="140.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="246.1" cy="142.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="265.1" cy="146.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="292.7" cy="156.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="279.7" cy="133.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="300.2" cy="154.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="274.8" cy="147.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="299.9" cy="151.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="285.7" cy="134.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="287.1" cy="145.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="286.6" cy="138.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="272.5" cy="146.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="297.1" cy="136.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="281.4" cy="156.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="283.8" cy="156.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="286.1" cy="145.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="284.5" cy="148.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="279.2" cy="152.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="277.2" cy="165.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="275.6" cy="143.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="295.5" cy="144.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="282.7" cy="166.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="279.0" cy="142.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="294.7" cy="172.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="288.1" cy="147.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="289.5" cy="128.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="287.0" cy="136.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="265.7" cy="156.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="285.6" cy="142.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="276.2" cy="153.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="269.9" cy="128.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="279.1" cy="145.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="286.6" cy="147.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="285.1" cy="144.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="289.0" cy="153.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="296.8" cy="151.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="271.3" cy="122.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="283.9" cy="165.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="272.0" cy="166.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="290.8" cy="172.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="289.7" cy="161.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="295.6" cy="160.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="289.2" cy="161.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="283.6" cy="165.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="282.6" cy="164.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="273.9" cy="164.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="282.3" cy="162.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="286.9" cy="162.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="278.3" cy="167.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="297.0" cy="166.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="284.8" cy="166.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="264.4" cy="150.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="281.2" cy="157.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="282.0" cy="151.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="279.4" cy="172.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="298.7" cy="161.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="272.7" cy="148.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="299.8" cy="167.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="266.6" cy="144.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="284.0" cy="158.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="276.0" cy="161.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="270.5" cy="162.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="294.7" cy="143.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="269.4" cy="154.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="279.5" cy="149.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="285.5" cy="171.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="282.3" cy="165.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="292.8" cy="169.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="273.1" cy="151.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="278.6" cy="156.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="300.1" cy="163.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="292.1" cy="182.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="274.5" cy="181.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="279.9" cy="166.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="291.3" cy="195.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="295.1" cy="186.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="297.8" cy="206.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="290.4" cy="167.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="288.3" cy="187.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="280.6" cy="186.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="274.9" cy="169.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="286.1" cy="178.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="291.3" cy="190.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="291.1" cy="177.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="309.2" cy="186.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="295.4" cy="186.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="283.9" cy="164.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="288.7" cy="179.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="274.7" cy="188.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="269.7" cy="189.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="297.9" cy="204.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="295.7" cy="184.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="288.6" cy="185.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="298.2" cy="170.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="290.9" cy="189.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="294.0" cy="194.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="287.1" cy="182.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="312.7" cy="211.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="296.0" cy="189.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="303.9" cy="158.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="290.4" cy="181.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="293.1" cy="198.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="302.3" cy="186.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="307.6" cy="185.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="290.6" cy="187.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="309.4" cy="211.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="310.2" cy="195.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="306.2" cy="205.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="323.7" cy="223.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="311.6" cy="201.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="296.8" cy="233.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="276.8" cy="233.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="277.2" cy="188.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="296.8" cy="213.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="310.3" cy="207.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="310.0" cy="209.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="314.4" cy="200.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="304.1" cy="208.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="310.5" cy="221.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="284.5" cy="225.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="307.6" cy="196.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="284.7" cy="184.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="286.9" cy="199.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="299.9" cy="183.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="296.0" cy="207.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="304.2" cy="196.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="314.0" cy="208.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="315.1" cy="199.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="297.1" cy="215.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="302.8" cy="209.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="301.7" cy="242.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="300.1" cy="199.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="290.1" cy="215.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="307.4" cy="210.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="312.0" cy="199.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="296.8" cy="205.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="333.9" cy="204.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="297.0" cy="207.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="311.3" cy="209.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="293.0" cy="234.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="298.1" cy="233.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="281.8" cy="218.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="284.8" cy="234.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="286.1" cy="233.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="296.4" cy="229.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="305.8" cy="228.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="323.5" cy="251.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="278.7" cy="225.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="302.9" cy="246.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="298.2" cy="228.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="284.2" cy="230.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="315.1" cy="220.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="321.8" cy="229.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="307.3" cy="227.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="270.1" cy="230.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="285.7" cy="218.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="300.3" cy="225.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="309.2" cy="205.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="298.8" cy="255.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="307.0" cy="232.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="292.3" cy="212.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="303.4" cy="224.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="300.4" cy="205.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="293.2" cy="227.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="299.1" cy="222.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="300.5" cy="244.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="294.8" cy="236.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="300.0" cy="227.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="292.0" cy="206.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="310.9" cy="236.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="290.9" cy="221.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="294.7" cy="229.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="317.8" cy="227.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="272.0" cy="277.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="276.6" cy="237.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="291.2" cy="237.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="282.8" cy="248.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="287.7" cy="244.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="295.3" cy="247.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="274.5" cy="245.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="282.1" cy="259.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="277.6" cy="236.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="288.8" cy="246.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="272.6" cy="261.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="286.4" cy="256.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="283.6" cy="242.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="287.6" cy="262.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="293.6" cy="243.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="285.7" cy="269.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="283.2" cy="248.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="295.0" cy="241.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="277.2" cy="245.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="273.6" cy="250.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="278.2" cy="237.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="279.3" cy="248.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="284.8" cy="254.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="285.7" cy="246.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="304.8" cy="254.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="297.1" cy="232.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="279.3" cy="213.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="281.6" cy="247.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="291.3" cy="265.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="293.0" cy="247.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="277.0" cy="235.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="277.5" cy="254.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="288.8" cy="256.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="281.4" cy="247.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="302.2" cy="261.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="284.0" cy="292.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="269.5" cy="278.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="255.6" cy="278.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="290.9" cy="272.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="280.8" cy="266.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="284.3" cy="287.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="299.7" cy="272.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="268.4" cy="273.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="299.0" cy="274.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="305.5" cy="274.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="276.7" cy="281.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="277.0" cy="256.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="276.0" cy="277.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="286.4" cy="265.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="275.4" cy="259.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="276.4" cy="270.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="277.3" cy="265.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="296.9" cy="256.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="302.2" cy="272.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="280.7" cy="302.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="284.0" cy="266.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="275.7" cy="269.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="261.5" cy="268.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="287.7" cy="263.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="275.5" cy="245.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="279.2" cy="264.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="268.0" cy="285.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="270.2" cy="283.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="294.2" cy="277.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="277.9" cy="270.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="288.1" cy="273.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="289.9" cy="271.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="282.9" cy="267.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="277.5" cy="270.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="270.8" cy="280.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="286.9" cy="291.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="266.4" cy="279.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="270.2" cy="296.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="263.4" cy="269.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.3" cy="265.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="281.3" cy="291.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="272.0" cy="273.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="255.8" cy="291.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.1" cy="273.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.8" cy="290.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="276.9" cy="290.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="262.3" cy="290.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="254.6" cy="289.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="268.8" cy="281.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="277.3" cy="255.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="296.3" cy="299.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="256.1" cy="280.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="289.6" cy="266.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="272.1" cy="279.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="271.5" cy="286.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="296.0" cy="274.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="256.7" cy="291.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="276.2" cy="270.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.3" cy="273.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="283.3" cy="273.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="259.1" cy="270.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="269.8" cy="285.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="270.5" cy="285.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="267.9" cy="296.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="272.2" cy="291.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="279.6" cy="279.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="276.1" cy="296.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="241.8" cy="303.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="222.1" cy="288.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="256.6" cy="300.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="235.9" cy="292.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="239.7" cy="289.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="243.0" cy="289.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="241.5" cy="297.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="257.5" cy="291.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="240.1" cy="307.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="239.1" cy="299.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="254.6" cy="284.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="245.9" cy="297.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="244.8" cy="293.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="247.9" cy="293.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="238.3" cy="299.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="255.5" cy="286.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="242.1" cy="296.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="241.4" cy="294.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="240.9" cy="290.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="241.5" cy="292.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="238.7" cy="302.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="244.7" cy="297.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="237.6" cy="294.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="240.3" cy="295.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="248.7" cy="285.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="247.8" cy="298.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="260.8" cy="289.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="249.2" cy="296.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="266.1" cy="285.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="230.4" cy="281.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="251.5" cy="282.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="248.8" cy="316.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="232.0" cy="304.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="254.2" cy="315.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="225.4" cy="323.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="214.2" cy="316.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="224.2" cy="310.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="240.8" cy="295.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="244.0" cy="314.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="232.6" cy="311.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="230.4" cy="296.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="209.3" cy="304.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="217.9" cy="304.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="209.7" cy="301.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="213.9" cy="313.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="209.7" cy="314.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="235.4" cy="310.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="223.7" cy="321.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="222.9" cy="304.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="229.4" cy="323.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="215.3" cy="310.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="216.9" cy="311.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="236.4" cy="317.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="229.8" cy="310.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="209.2" cy="293.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="224.7" cy="296.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="206.1" cy="307.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="217.4" cy="313.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="240.4" cy="303.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="243.9" cy="308.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="221.9" cy="303.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="232.3" cy="307.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="192.7" cy="310.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="227.5" cy="317.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="224.0" cy="302.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="220.1" cy="312.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="223.2" cy="291.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="218.6" cy="333.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="208.1" cy="295.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="215.8" cy="299.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="204.4" cy="309.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="196.2" cy="321.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="208.6" cy="307.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="211.8" cy="302.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="200.0" cy="298.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="205.0" cy="299.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="218.6" cy="319.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="200.0" cy="310.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="216.2" cy="293.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="209.3" cy="300.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="219.6" cy="318.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="201.3" cy="307.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="205.2" cy="300.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="166.8" cy="286.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="201.4" cy="308.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="210.6" cy="320.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="202.5" cy="281.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="203.3" cy="315.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="191.2" cy="291.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="201.6" cy="303.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="201.4" cy="311.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="204.7" cy="307.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="191.4" cy="295.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="210.2" cy="301.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="206.7" cy="309.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="224.0" cy="309.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="209.3" cy="306.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="199.2" cy="311.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="206.3" cy="322.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="206.6" cy="316.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="197.2" cy="299.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="206.4" cy="305.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="180.2" cy="322.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="175.7" cy="311.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="183.2" cy="313.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.7" cy="331.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="192.2" cy="317.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="171.0" cy="329.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="161.3" cy="292.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.7" cy="304.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="180.0" cy="322.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="175.9" cy="316.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.0" cy="318.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="181.2" cy="310.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="211.3" cy="319.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="187.3" cy="326.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="184.4" cy="330.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="172.6" cy="307.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="182.8" cy="310.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="176.3" cy="328.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="198.6" cy="322.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="176.4" cy="300.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="194.0" cy="317.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="160.6" cy="321.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="179.4" cy="306.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="183.7" cy="319.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="181.5" cy="330.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="180.0" cy="312.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="175.4" cy="304.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="178.1" cy="335.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="158.2" cy="309.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="169.2" cy="315.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="177.8" cy="340.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="185.8" cy="344.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="188.8" cy="308.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="180.3" cy="319.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="156.9" cy="290.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="153.5" cy="320.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="162.6" cy="307.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="166.5" cy="306.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="151.8" cy="306.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="177.6" cy="309.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="145.3" cy="314.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="169.7" cy="297.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="153.5" cy="314.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="151.2" cy="329.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="159.2" cy="318.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="162.6" cy="309.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="162.8" cy="318.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="160.5" cy="311.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="155.6" cy="315.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="162.1" cy="313.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="152.4" cy="298.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="156.4" cy="295.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="169.2" cy="317.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="161.4" cy="304.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="160.2" cy="307.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="161.2" cy="308.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="164.5" cy="308.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="158.9" cy="316.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="178.1" cy="329.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="160.6" cy="305.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="150.9" cy="304.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="153.5" cy="330.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="173.9" cy="324.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="161.9" cy="326.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="155.9" cy="316.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="157.7" cy="315.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="156.8" cy="316.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="151.7" cy="325.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="163.5" cy="294.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="134.9" cy="299.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="150.4" cy="303.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="138.1" cy="291.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="133.1" cy="306.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="140.5" cy="318.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="151.2" cy="284.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="144.0" cy="314.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="145.4" cy="301.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="159.6" cy="297.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="153.9" cy="301.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="137.6" cy="298.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="142.4" cy="313.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="138.0" cy="298.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="136.0" cy="313.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="138.1" cy="306.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="134.2" cy="293.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="135.5" cy="299.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="142.7" cy="304.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="141.8" cy="280.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="129.8" cy="293.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="127.1" cy="308.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="156.4" cy="284.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="152.6" cy="303.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="138.0" cy="305.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="106.9" cy="300.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="130.2" cy="307.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="128.8" cy="303.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="134.3" cy="300.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="122.4" cy="282.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="133.6" cy="305.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="141.6" cy="293.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="135.6" cy="299.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="127.6" cy="304.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="112.6" cy="291.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="106.3" cy="300.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="113.4" cy="297.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="108.1" cy="309.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="109.6" cy="293.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="116.0" cy="306.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="111.5" cy="308.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="119.9" cy="313.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="104.3" cy="313.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="106.8" cy="265.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="117.7" cy="304.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="108.9" cy="301.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="119.2" cy="298.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="90.9" cy="308.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="113.4" cy="305.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="113.2" cy="306.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="100.1" cy="309.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="112.6" cy="295.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="104.3" cy="280.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="109.4" cy="300.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="119.3" cy="309.3" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="110.8" cy="289.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="125.9" cy="290.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="111.3" cy="290.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="107.2" cy="301.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="127.9" cy="284.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="112.9" cy="289.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="100.2" cy="275.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="103.3" cy="289.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="107.8" cy="295.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="129.3" cy="312.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="108.4" cy="287.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="110.0" cy="298.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="96.4" cy="303.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="80.6" cy="267.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="105.2" cy="274.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="99.9" cy="293.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="78.1" cy="293.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="88.3" cy="280.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="91.4" cy="279.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="98.2" cy="287.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="61.9" cy="276.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="107.2" cy="289.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="92.0" cy="271.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="76.3" cy="278.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="73.4" cy="277.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="85.1" cy="285.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="92.0" cy="275.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="91.9" cy="281.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="102.5" cy="279.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="86.7" cy="289.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="89.4" cy="283.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="107.7" cy="281.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="91.2" cy="271.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="92.2" cy="282.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="93.3" cy="268.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="104.1" cy="276.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="95.0" cy="276.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="91.1" cy="282.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="95.4" cy="271.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="98.2" cy="269.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="82.0" cy="275.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="96.0" cy="293.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="90.9" cy="276.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="97.2" cy="272.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="89.7" cy="294.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="75.4" cy="274.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="82.0" cy="295.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="89.2" cy="261.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="86.9" cy="278.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="85.1" cy="265.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="86.7" cy="261.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="86.8" cy="266.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="74.3" cy="265.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="74.3" cy="270.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="76.5" cy="276.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="91.5" cy="262.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="89.8" cy="259.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="90.2" cy="262.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="91.6" cy="256.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="84.6" cy="261.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="89.3" cy="263.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="86.1" cy="262.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="92.2" cy="270.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="87.6" cy="268.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="95.2" cy="275.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="90.6" cy="261.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="94.7" cy="258.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="82.8" cy="260.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="103.7" cy="251.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="88.8" cy="257.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="84.0" cy="255.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="84.6" cy="263.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="99.1" cy="253.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="84.5" cy="263.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="94.6" cy="273.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="71.6" cy="264.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="91.7" cy="269.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="69.1" cy="265.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="88.7" cy="262.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="97.1" cy="264.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="74.0" cy="258.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="68.4" cy="240.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="61.9" cy="254.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="90.8" cy="244.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="66.1" cy="240.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="89.8" cy="251.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="86.1" cy="242.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="64.5" cy="263.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="69.1" cy="248.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="90.7" cy="235.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="68.4" cy="244.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="67.6" cy="257.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="61.6" cy="250.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="69.8" cy="248.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="62.9" cy="252.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="50.9" cy="260.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="70.2" cy="258.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="79.8" cy="235.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="71.4" cy="259.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="52.2" cy="247.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="74.2" cy="243.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="69.8" cy="254.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="62.6" cy="242.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="71.1" cy="246.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="71.9" cy="243.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="77.4" cy="244.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="71.9" cy="251.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="85.7" cy="249.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="50.2" cy="230.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="68.0" cy="241.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="50.3" cy="229.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="61.0" cy="237.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="59.5" cy="239.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="70.2" cy="242.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="52.9" cy="253.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="58.1" cy="216.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="64.1" cy="226.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="60.2" cy="207.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="49.4" cy="233.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="60.0" cy="220.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="56.5" cy="243.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="53.6" cy="236.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="50.7" cy="228.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="53.7" cy="220.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="54.0" cy="223.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="76.2" cy="230.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="41.3" cy="217.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="61.0" cy="223.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="55.4" cy="227.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="27.4" cy="205.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="41.7" cy="227.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="42.9" cy="234.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="60.5" cy="238.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="59.3" cy="227.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="56.6" cy="223.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="62.8" cy="230.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="59.6" cy="222.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="73.0" cy="241.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="57.6" cy="229.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="57.1" cy="221.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="58.3" cy="219.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="54.0" cy="210.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="73.5" cy="234.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="53.5" cy="221.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="72.0" cy="218.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="56.9" cy="247.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="64.0" cy="225.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="73.4" cy="226.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="76.2" cy="235.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="60.6" cy="207.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="68.0" cy="197.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="48.2" cy="206.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="55.9" cy="202.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="56.9" cy="207.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="64.2" cy="196.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="53.1" cy="215.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="47.4" cy="213.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="54.9" cy="211.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="68.7" cy="173.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="58.8" cy="203.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="68.1" cy="204.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="59.6" cy="197.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="52.0" cy="197.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="72.2" cy="203.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="55.5" cy="221.2" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="51.2" cy="210.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="57.7" cy="195.7" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="45.1" cy="192.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="58.3" cy="221.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="64.8" cy="205.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="48.4" cy="196.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="63.7" cy="200.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="64.0" cy="201.1" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="66.8" cy="192.6" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="59.5" cy="219.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="67.0" cy="197.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="79.3" cy="194.4" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="52.4" cy="218.3" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="64.8" cy="195.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="62.3" cy="206.9" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="64.9" cy="237.0" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="55.1" cy="199.8" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="65.8" cy="219.5" r="1.1" fill="#3987e5" opacity=".55"/>
<circle cx="71.1" cy="185.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="47.0" cy="189.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="79.5" cy="188.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.7" cy="206.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="50.5" cy="171.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="53.0" cy="180.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="62.2" cy="184.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.5" cy="189.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.6" cy="188.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="58.5" cy="177.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="63.5" cy="188.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.9" cy="184.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="77.5" cy="183.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="66.9" cy="178.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.9" cy="171.8" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="61.9" cy="196.9" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="65.9" cy="182.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="73.6" cy="183.1" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="83.7" cy="169.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="70.9" cy="186.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="76.7" cy="153.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="72.9" cy="167.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="76.1" cy="172.6" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="75.3" cy="184.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="72.5" cy="187.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="77.8" cy="185.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="60.1" cy="179.0" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="83.0" cy="179.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="86.5" cy="173.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="64.1" cy="188.5" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="79.7" cy="191.2" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="67.0" cy="181.4" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="58.1" cy="167.3" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="65.5" cy="187.7" r="1.1" fill="#d95926" opacity=".55"/>
<circle cx="50.5" cy="171.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="100.0" cy="163.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="71.6" cy="177.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="66.9" cy="169.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="88.0" cy="152.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="84.9" cy="170.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="71.1" cy="159.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="89.6" cy="163.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="84.0" cy="170.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="87.4" cy="158.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="66.4" cy="159.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="70.5" cy="147.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="74.7" cy="169.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="77.4" cy="173.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="62.9" cy="166.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="76.0" cy="173.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="59.6" cy="145.2" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="70.8" cy="168.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="79.6" cy="167.8" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="75.1" cy="163.1" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="74.6" cy="160.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="63.3" cy="167.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="89.7" cy="179.6" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="60.7" cy="156.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="55.3" cy="169.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="47.3" cy="168.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="64.2" cy="159.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="78.2" cy="168.7" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="67.6" cy="156.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="72.6" cy="162.3" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="68.7" cy="173.9" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="68.8" cy="171.4" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="72.8" cy="160.5" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="60.8" cy="166.0" r="1.1" fill="#199e70" opacity=".55"/>
<circle cx="73.3" cy="149.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="82.0" cy="141.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="92.5" cy="148.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="79.7" cy="155.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="72.1" cy="143.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="79.9" cy="153.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="44.8" cy="178.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="80.4" cy="140.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="83.5" cy="147.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="103.3" cy="152.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="74.6" cy="130.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="112.9" cy="146.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="78.4" cy="137.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="84.4" cy="142.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="81.4" cy="133.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="73.2" cy="143.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="80.9" cy="139.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="88.4" cy="156.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="78.3" cy="146.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="83.7" cy="163.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="91.4" cy="150.7" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="65.1" cy="142.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="75.3" cy="149.2" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="71.3" cy="123.9" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="80.0" cy="133.6" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="82.2" cy="145.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="74.2" cy="123.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="88.9" cy="147.0" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="81.8" cy="128.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="91.8" cy="124.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="46.0" cy="143.8" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="71.6" cy="143.1" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="78.3" cy="140.4" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="81.4" cy="133.5" r="1.1" fill="#c98500" opacity=".55"/>
<circle cx="93.2" cy="134.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="88.3" cy="121.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="114.9" cy="128.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="95.1" cy="127.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="104.1" cy="133.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="115.7" cy="109.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="96.7" cy="132.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="99.0" cy="113.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="121.6" cy="137.4" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="73.7" cy="129.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="81.1" cy="126.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="103.9" cy="128.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="102.1" cy="127.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="107.0" cy="134.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="98.8" cy="131.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="102.9" cy="131.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="98.0" cy="125.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="95.4" cy="125.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="79.3" cy="118.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="102.8" cy="131.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="100.8" cy="126.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="103.1" cy="132.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="86.3" cy="128.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="100.3" cy="129.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="87.8" cy="135.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="108.6" cy="116.6" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="111.7" cy="145.3" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="104.8" cy="138.1" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="105.3" cy="115.9" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="92.8" cy="131.5" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="106.8" cy="115.7" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="102.7" cy="126.8" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="100.0" cy="121.2" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="93.7" cy="137.0" r="1.1" fill="#d55181" opacity=".55"/>
<circle cx="94.4" cy="128.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="121.7" cy="115.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="119.5" cy="114.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="112.2" cy="117.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="128.3" cy="115.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="112.4" cy="120.9" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="109.3" cy="108.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="130.4" cy="124.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="113.4" cy="120.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="119.0" cy="119.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="124.6" cy="116.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="96.2" cy="94.2" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="125.8" cy="97.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="137.2" cy="122.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="115.2" cy="115.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="114.5" cy="139.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="100.2" cy="113.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="117.6" cy="128.4" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="86.7" cy="114.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="114.2" cy="132.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="115.6" cy="123.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="111.6" cy="114.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="129.5" cy="114.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="114.9" cy="118.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="111.8" cy="116.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="122.7" cy="123.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="114.7" cy="128.6" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="118.0" cy="126.0" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="139.7" cy="131.7" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="110.6" cy="112.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="111.3" cy="115.1" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="115.4" cy="109.3" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="99.2" cy="122.8" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="110.5" cy="119.5" r="1.1" fill="#9085e9" opacity=".55"/>
<circle cx="132.1" cy="102.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="121.9" cy="98.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="130.3" cy="102.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="131.2" cy="102.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="135.1" cy="97.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="114.5" cy="100.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="130.2" cy="112.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="133.4" cy="96.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="147.2" cy="121.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="121.2" cy="104.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="144.7" cy="104.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="132.0" cy="88.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="138.5" cy="104.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="130.6" cy="65.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="137.7" cy="106.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="127.4" cy="88.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="121.0" cy="88.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="111.6" cy="97.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="132.8" cy="96.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="109.4" cy="103.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="135.1" cy="90.5" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="153.8" cy="121.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="149.6" cy="82.2" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="130.8" cy="98.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="114.6" cy="100.0" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="127.9" cy="102.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="136.1" cy="85.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="122.3" cy="109.8" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="111.9" cy="106.3" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="131.0" cy="106.9" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="122.2" cy="108.6" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="130.2" cy="105.4" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="135.6" cy="89.1" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="119.5" cy="104.7" r="1.1" fill="#e66767" opacity=".55"/>
<circle cx="157.9" cy="105.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="148.2" cy="97.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="132.7" cy="88.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="148.3" cy="117.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="166.8" cy="85.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="164.6" cy="130.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="152.8" cy="103.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="159.0" cy="102.5" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="127.4" cy="89.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="156.4" cy="99.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="138.9" cy="97.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="153.9" cy="101.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="151.6" cy="91.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="147.9" cy="96.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="143.9" cy="118.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="147.9" cy="100.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="165.2" cy="108.2" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="145.6" cy="97.3" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="132.4" cy="89.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="131.2" cy="103.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="125.7" cy="113.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="138.1" cy="128.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="151.0" cy="100.6" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="152.2" cy="110.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="165.2" cy="100.4" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="168.3" cy="111.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="164.7" cy="94.9" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="180.4" cy="100.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="162.7" cy="96.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="154.7" cy="107.0" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="145.7" cy="100.8" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="157.0" cy="103.7" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="148.1" cy="93.1" r="1.1" fill="#5598e7" opacity=".55"/>
<circle cx="165.4" cy="101.2" r="1.1" fill="#5598e7" opacity=".55"/>
<polyline points="180.0,91.0 204.4,102.1 224.5,105.3 241.9,111.1 265.9,132.0 282.8,143.2 284.4,162.8 291.4,184.8 304.1,205.0 298.5,225.9 282.7,245.4 277.2,268.3 268.4,278.8 245.1,295.5 222.5,308.8 203.5,306.2 180.0,316.9 157.8,312.4 136.8,301.0 111.4,299.6 93.9,280.1 87.2,264.2 72.9,248.5 57.4,225.3 61.7,205.0 71.2,183.2 69.6,165.5 76.4,142.4 98.9,128.2 117.7,118.1 133.0,99.7 156.1,101.6 180.0,91.0" class="sk-spring"/>
<line x1="180.0" y1="91.0" x2="245.1" y2="295.5" class="sk-spring"/>
<line x1="265.9" y1="132.0" x2="157.8" y2="312.4" class="sk-spring"/>
<line x1="304.1" y1="205.0" x2="87.2" y2="264.2" class="sk-spring"/>
<line x1="268.4" y1="278.8" x2="71.2" y2="183.2" class="sk-spring"/>
<line x1="180.0" y1="316.9" x2="117.7" y2="118.1" class="sk-spring"/>
<line x1="93.9" y1="280.1" x2="204.4" y2="102.1" class="sk-spring"/>
<line x1="61.7" y1="205.0" x2="282.8" y2="143.2" class="sk-spring"/>
<line x1="98.9" y1="128.2" x2="298.5" y2="225.9" class="sk-spring"/>
<circle cx="180.0" cy="91.0" r="3.6" class="sk-node"/>
<circle cx="204.4" cy="102.1" r="3.6" class="sk-node"/>
<circle cx="224.5" cy="105.3" r="3.6" class="sk-node"/>
<circle cx="241.9" cy="111.1" r="3.6" class="sk-node"/>
<circle cx="265.9" cy="132.0" r="3.6" class="sk-node"/>
<circle cx="282.8" cy="143.2" r="3.6" class="sk-node"/>
<circle cx="284.4" cy="162.8" r="3.6" class="sk-node"/>
<circle cx="291.4" cy="184.8" r="3.6" class="sk-node"/>
<circle cx="304.1" cy="205.0" r="3.6" class="sk-node"/>
<circle cx="298.5" cy="225.9" r="3.6" class="sk-node"/>
<circle cx="282.7" cy="245.4" r="3.6" class="sk-node"/>
<circle cx="277.2" cy="268.3" r="3.6" class="sk-node"/>
<circle cx="268.4" cy="278.8" r="3.6" class="sk-node"/>
<circle cx="245.1" cy="295.5" r="3.6" class="sk-node"/>
<circle cx="222.5" cy="308.8" r="3.6" class="sk-node"/>
<circle cx="203.5" cy="306.2" r="3.6" class="sk-node"/>
<circle cx="180.0" cy="316.9" r="3.6" class="sk-node"/>
<circle cx="157.8" cy="312.4" r="3.6" class="sk-node"/>
<circle cx="136.8" cy="301.0" r="3.6" class="sk-node"/>
<circle cx="111.4" cy="299.6" r="3.6" class="sk-node"/>
<circle cx="93.9" cy="280.1" r="3.6" class="sk-node"/>
<circle cx="87.2" cy="264.2" r="3.6" class="sk-node"/>
<circle cx="72.9" cy="248.5" r="3.6" class="sk-node"/>
<circle cx="57.4" cy="225.3" r="3.6" class="sk-node"/>
<circle cx="61.7" cy="205.0" r="3.6" class="sk-node"/>
<circle cx="71.2" cy="183.2" r="3.6" class="sk-node"/>
<circle cx="69.6" cy="165.5" r="3.6" class="sk-node"/>
<circle cx="76.4" cy="142.4" r="3.6" class="sk-node"/>
<circle cx="98.9" cy="128.2" r="3.6" class="sk-node"/>
<circle cx="117.7" cy="118.1" r="3.6" class="sk-node"/>
<circle cx="133.0" cy="99.7" r="3.6" class="sk-node"/>
<circle cx="156.1" cy="101.6" r="3.6" class="sk-node"/>
<path d="M232 236 l0 16 l4.5 -4 l3 7 l3 -1.4 l-3 -7 l6 0 z" class="sk-cursor"/>
<text x="16" y="56" class="sk-lab">SIMULATION</text>
<text x="372" y="56" class="sk-lab">MARKET GRID</text>
<text x="372" y="74" class="sk-head">SYM</text>
<text x="424" y="74" class="sk-head">BID</text>
<text x="476" y="74" class="sk-head">ASK</text>
<text x="528" y="74" class="sk-head">LAST</text>
<text x="580" y="74" class="sk-head">CHG%</text>
<text x="628" y="74" class="sk-head">VOL</text>
<text x="672" y="74" class="sk-head">TREND</text>
<text x="372" y="102" class="sk-sym">AXR</text>
<rect x="421" y="89" width="46" height="18" rx="3" class="sk-up"/>
<text x="424" y="102" class="sk-cell">121.84</text>
<text x="476" y="102" class="sk-cell">121.86</text>
<text x="528" y="102" class="sk-cell">121.85</text>
<text x="580" y="102" class="sk-cell">-2.75</text>
<rect x="625" y="89" width="46" height="18" rx="3" class="sk-up"/>
<text x="628" y="102" class="sk-cell">431k</text>
<polyline points="672.0,98.6 674.6,98.6 677.2,100.5 679.8,104.2 682.4,99.7 685.0,97.7 687.6,100.0 690.2,98.3 692.8,99.3 695.4,100.5 698.0,99.4 700.6,98.6 703.2,95.8 705.8,95.5 708.4,96.4 711.0,96.6" class="sk-spark"/>
<text x="372" y="126" class="sk-sym">BLV</text>
<text x="424" y="126" class="sk-cell">171.65</text>
<text x="476" y="126" class="sk-cell">171.67</text>
<rect x="525" y="113" width="46" height="18" rx="3" class="sk-up"/>
<text x="528" y="126" class="sk-cell">171.66</text>
<text x="580" y="126" class="sk-cell">-0.06</text>
<rect x="625" y="113" width="46" height="18" rx="3" class="sk-dn"/>
<text x="628" y="126" class="sk-cell">488k</text>
<polyline points="672.0,121.1 674.6,122.3 677.2,122.2 679.8,123.3 682.4,125.9 685.0,124.1 687.6,122.5 690.2,124.7 692.8,124.1 695.4,124.6 698.0,127.0 700.6,125.0 703.2,127.5 705.8,126.9 708.4,125.6 711.0,124.3" class="sk-spark"/>
<text x="372" y="150" class="sk-sym">CTN</text>
<rect x="421" y="137" width="46" height="18" rx="3" class="sk-up"/>
<text x="424" y="150" class="sk-cell">27.04</text>
<text x="476" y="150" class="sk-cell">27.06</text>
<rect x="525" y="137" width="46" height="18" rx="3" class="sk-up"/>
<text x="528" y="150" class="sk-cell">27.05</text>
<rect x="577" y="137" width="46" height="18" rx="3" class="sk-dn"/>
<text x="580" y="150" class="sk-cell">+2.58</text>
<text x="628" y="150" class="sk-cell">885k</text>
<polyline points="672.0,149.3 674.6,150.8 677.2,149.3 679.8,146.5 682.4,144.4 685.0,145.7 687.6,145.6 690.2,145.1 692.8,145.8 695.4,145.0 698.0,146.1 700.6,148.2 703.2,153.1 705.8,153.4 708.4,151.6 711.0,152.9" class="sk-spark"/>
<rect x="366" y="158" width="342" height="24" class="sk-sel"/>
<text x="372" y="174" class="sk-sym">DRM</text>
<rect x="421" y="161" width="46" height="18" rx="3" class="sk-up"/>
<text x="424" y="174" class="sk-cell">73.60</text>
<rect x="473" y="161" width="46" height="18" rx="3" class="sk-dn"/>
<text x="476" y="174" class="sk-cell">73.62</text>
<rect x="525" y="161" width="46" height="18" rx="3" class="sk-up"/>
<text x="528" y="174" class="sk-cell">73.61</text>
<rect x="577" y="161" width="46" height="18" rx="3" class="sk-up"/>
<text x="580" y="174" class="sk-cell">+2.23</text>
<rect x="625" y="161" width="46" height="18" rx="3" class="sk-up"/>
<text x="628" y="174" class="sk-cell">353k</text>
<polyline points="672.0,168.9 674.6,167.0 677.2,169.1 679.8,172.2 682.4,173.8 685.0,174.8 687.6,175.5 690.2,174.4 692.8,170.1 695.4,171.7 698.0,172.2 700.6,170.9 703.2,168.5 705.8,171.6 708.4,167.3 711.0,171.5" class="sk-spark"/>
<text x="372" y="198" class="sk-sym">EKO</text>
<rect x="421" y="185" width="46" height="18" rx="3" class="sk-dn"/>
<text x="424" y="198" class="sk-cell">53.29</text>
<text x="476" y="198" class="sk-cell">53.31</text>
<text x="528" y="198" class="sk-cell">53.30</text>
<text x="580" y="198" class="sk-cell">+2.71</text>
<text x="628" y="198" class="sk-cell">526k</text>
<polyline points="672.0,187.2 674.6,189.9 677.2,187.5 679.8,187.0 682.4,186.0 685.0,186.0 687.6,186.0 690.2,186.0 692.8,189.9 695.4,192.5 698.0,192.1 700.6,188.1 703.2,191.8 705.8,192.5 708.4,192.8 711.0,193.1" class="sk-spark"/>
<text x="372" y="222" class="sk-sym">FLX</text>
<text x="424" y="222" class="sk-cell">133.71</text>
<text x="476" y="222" class="sk-cell">133.73</text>
<text x="528" y="222" class="sk-cell">133.72</text>
<rect x="577" y="209" width="46" height="18" rx="3" class="sk-dn"/>
<text x="580" y="222" class="sk-cell">+1.17</text>
<text x="628" y="222" class="sk-cell">804k</text>
<polyline points="672.0,216.0 674.6,216.0 677.2,217.9 679.8,218.7 682.4,218.9 685.0,220.1 687.6,219.7 690.2,217.8 692.8,213.5 695.4,216.5 698.0,217.3 700.6,212.4 703.2,213.2 705.8,212.2 708.4,212.1 711.0,212.7" class="sk-spark"/>
<text x="372" y="246" class="sk-sym">GRN</text>
<text x="424" y="246" class="sk-cell">128.74</text>
<rect x="473" y="233" width="46" height="18" rx="3" class="sk-dn"/>
<text x="476" y="246" class="sk-cell">128.76</text>
<text x="528" y="246" class="sk-cell">128.75</text>
<text x="580" y="246" class="sk-cell">+0.98</text>
<text x="628" y="246" class="sk-cell">369k</text>
<polyline points="672.0,242.9 674.6,242.3 677.2,241.8 679.8,243.7 682.4,242.3 685.0,241.3 687.6,240.2 690.2,238.0 692.8,236.0 695.4,234.4 698.0,234.5 700.6,234.0 703.2,234.0 705.8,234.0 708.4,234.0 711.0,234.0" class="sk-spark"/>
<text x="372" y="270" class="sk-sym">HLO</text>
<text x="424" y="270" class="sk-cell">110.33</text>
<text x="476" y="270" class="sk-cell">110.35</text>
<text x="528" y="270" class="sk-cell">110.34</text>
<text x="580" y="270" class="sk-cell">-1.63</text>
<text x="628" y="270" class="sk-cell">519k</text>
<polyline points="672.0,270.6 674.6,270.6 677.2,270.9 679.8,269.0 682.4,273.5 685.0,274.0 687.6,273.4 690.2,272.9 692.8,273.0 695.4,274.0 698.0,274.0 700.6,272.4 703.2,274.0 705.8,272.0 708.4,274.0 711.0,274.0" class="sk-spark"/>
<text x="372" y="294" class="sk-sym">IVY</text>
<text x="424" y="294" class="sk-cell">82.98</text>
<text x="476" y="294" class="sk-cell">83.00</text>
<text x="528" y="294" class="sk-cell">82.99</text>
<text x="580" y="294" class="sk-cell">+1.49</text>
<text x="628" y="294" class="sk-cell">858k</text>
<polyline points="672.0,288.5 674.6,290.9 677.2,289.1 679.8,284.9 682.4,282.9 685.0,282.0 687.6,282.0 690.2,282.0 692.8,282.0 695.4,282.0 698.0,282.5 700.6,282.0 703.2,284.2 705.8,289.7 708.4,291.1 711.0,288.4" class="sk-spark"/>
<text x="372" y="318" class="sk-sym">JET</text>
<text x="424" y="318" class="sk-cell">47.92</text>
<text x="476" y="318" class="sk-cell">47.94</text>
<text x="528" y="318" class="sk-cell">47.93</text>
<rect x="577" y="305" width="46" height="18" rx="3" class="sk-up"/>
<text x="580" y="318" class="sk-cell">-2.02</text>
<text x="628" y="318" class="sk-cell">809k</text>
<polyline points="672.0,314.6 674.6,316.6 677.2,319.1 679.8,321.9 682.4,321.1 685.0,319.5 687.6,319.6 690.2,322.0 692.8,316.7 695.4,318.6 698.0,317.4 700.6,319.0 703.2,320.0 705.8,319.1 708.4,317.2 711.0,316.3" class="sk-spark"/>
<text x="372" y="342" class="sk-sym">KAI</text>
<text x="424" y="342" class="sk-cell">150.46</text>
<text x="476" y="342" class="sk-cell">150.48</text>
<rect x="525" y="329" width="46" height="18" rx="3" class="sk-dn"/>
<text x="528" y="342" class="sk-cell">150.47</text>
<text x="580" y="342" class="sk-cell">+0.29</text>
<text x="628" y="342" class="sk-cell">788k</text>
<polyline points="672.0,339.0 674.6,342.5 677.2,345.3 679.8,345.5 682.4,346.0 685.0,346.0 687.6,345.6 690.2,346.0 692.8,343.8 695.4,346.0 698.0,346.0 700.6,346.0 703.2,344.2 705.8,343.4 708.4,342.7 711.0,342.4" class="sk-spark"/>
<text x="372" y="366" class="sk-sym">LUM</text>
<rect x="421" y="353" width="46" height="18" rx="3" class="sk-dn"/>
<text x="424" y="366" class="sk-cell">94.96</text>
<text x="476" y="366" class="sk-cell">94.98</text>
<text x="528" y="366" class="sk-cell">94.97</text>
<rect x="577" y="353" width="46" height="18" rx="3" class="sk-up"/>
<text x="580" y="366" class="sk-cell">+2.88</text>
<text x="628" y="366" class="sk-cell">507k</text>
<polyline points="672.0,363.1 674.6,365.9 677.2,370.0 679.8,370.0 682.4,367.9 685.0,365.3 687.6,368.5 690.2,367.1 692.8,367.1 695.4,368.9 698.0,369.2 700.6,369.7 703.2,370.0 705.8,365.5 708.4,365.0 711.0,366.5" class="sk-spark"/>
<line x1="360" y1="31" x2="360" y2="379" class="sk-div"/>
</svg>
  <div class="callouts">
    <div><b>Left: the simulation</b>32 sector nodes on springs, nudged by the trades in their sector. Around them, 250,000 particles by default (up to 2 million), each pulled toward its sector and toward your mouse.</div>
    <div><b>Right: the market grid</b>2,000 stocks receiving 120,000 price updates per second. Changed cells flash green or red and fade. Each row has a tiny live chart.</div>
  </div>
  <figcaption>Clicking a row opens a detail panel with a 256-point live chart. The halves are linked: every frame, the trades in each sector give that sector's node in the simulation a push.</figcaption>
</figure>

A few rules made the job genuinely hard:

- **No skipping updates.** Every cell must show its latest value on the very next frame. You can't quietly update the grid 10 times a second to save work.
- **Exact formatting.** Prices, percentages and volumes have to match the spec down to the rounding.
- **Hot rows.** Updates hit the top of the grid more often, so the visible part is the busiest part.
- **Real physics.** Every particle moves every frame, with no shortcuts like only updating half of them. A check compares the physics against a high-precision reference.
- **Showing only what's visible is fine.** Both sides may create just the rows on screen (<span class="term" tabindex="0" data-tip="Virtualization: only creating the rows that are actually visible, and reusing them as you scroll.">virtualization</span>), but scrolling must show the right rows immediately.

Data arrives over a WebSocket in either JSON or a compact binary format, and both sides had to handle both. Two formats times two choices for each half gives eight combinations, and I measured all of them.

## How I measured

**A script drove a real Chrome window on one laptop and measured everything itself, so neither agent could report its own numbers.**

A script using <span class="term" tabindex="0" data-tip="A tool that drives a real browser from code, clicking and scrolling the way a person would.">Playwright</span> drove a real, visible Chrome 157 window on a Linux laptop: an Intel i7-12700H with an RTX 3070 Mobile graphics card and a 240 Hz screen. Each test warmed up for 5 seconds, then measured for 15 seconds while the mouse circled over the simulation. Every number below is the <span class="term" tabindex="0" data-tip="The middle value when you sort the results. One odd run can't drag it around the way it can an average.">median</span> of three runs.

I tested a steady load, continuous scrolling, clicking a row every 0.4 seconds, a ramp from 10,000 to 2 million particles, and a ramp from 10,000 to 480,000 updates per second.

The test setup measured everything itself; neither side got to report its own numbers. It tracked frame rate, dropped frames, how busy the <span class="term" tabindex="0" data-tip="The single thread where the browser runs your JavaScript and also does layout and painting. If it's busy, the page can't update.">main thread</span> was, CPU use across all of Chrome's processes, garbage collection, and how long a click took to show up in the detail panel. After every run it checked the result: a fingerprint of the final data, the exact text of the visible rows, and the price history of five stocks.

### Two snags that changed the plan

**The 240 Hz ceiling.** My screen redraws 240 times a second, which leaves about 4.2 ms per frame, and I couldn't get Chrome to draw faster than that. Once both sides hit the ceiling, frame rate can't tell them apart anymore. So I compared how much work each side needed to get there. Less work means more <span class="term" tabindex="0" data-tip="Spare capacity. If a job uses less of the machine, more is left for a slower device, a busier page or a longer battery life.">headroom</span>.

**Slowing the machine down fairly.** Chrome has a built-in "pretend to be a slow phone" setting, but it only slows the main thread, not background workers. Work hidden in a worker would get a free pass. So I built a **weak-device mode** instead: all of Chrome pinned to two of the laptop's slow <span class="term" tabindex="0" data-tip="Modern Intel chips mix fast 'performance' cores with slower, power-saving 'efficiency' cores.">efficiency cores</span>, which slows everything equally.

## Result: nobody collapsed

**Neither version slowed down: both ran at my screen's maximum of 240 frames per second. The no-framework version did the same job with a bit less effort, which only showed on a deliberately slowed machine.**

<figure class="chart">
  <p class="fig-title">Frames per second: what the idea predicted vs. what I measured</p>
  <div class="legend"><span><i class="sw-claim"></i>Predicted</span><span><i class="sw-b"></i>Framework build</span><span><i class="sw-c"></i>Bare-metal build</span></div>
  <svg viewBox="0 0 720 290" class="viz" role="img" aria-label="Bar chart. The idea predicted 8 to 15 fps for a standard stack and 120 fps for the optimized stack. Measured: both builds at 240 fps, the screen's limit.">
    <g>
      <line class="gl" x1="230" y1="20" x2="230" y2="250"/><line class="gl" x1="347.5" y1="20" x2="347.5" y2="250"/><line class="gl" x1="465" y1="20" x2="465" y2="250"/><line class="gl" x1="582.5" y1="20" x2="582.5" y2="250"/>
      <text class="tk" x="230" y="270" text-anchor="middle">0</text><text class="tk" x="347.5" y="270" text-anchor="middle">60</text><text class="tk" x="465" y="270" text-anchor="middle">120</text><text class="tk" x="582.5" y="270" text-anchor="middle">180</text><text class="tk" x="700" y="270" text-anchor="middle">240 fps</text>
    </g>
    <text class="note" x="0" y="16">PREDICTED</text>
    <text class="lb" x="0" y="52">Normal stack</text>
    <rect class="fclaim" x="230" y="34" width="29.4" height="26" rx="3" data-tip="The prediction for a standard framework stack: 8–15 fps, with 50–120 ms garbage-collection stutters."/>
    <text class="val" x="268" y="52">8–15</text>
    <text class="lb" x="0" y="96">Zero-DX stack</text>
    <rect class="fclaim" x="230" y="78" width="235" height="26" rx="3" data-tip="The prediction for the zero-DX stack: 120 fps with frames under 2 ms."/>
    <text class="val" x="474" y="96">120</text>
    <line class="ax" x1="0" y1="128" x2="700" y2="128"/>
    <text class="note" x="0" y="152">MEASURED</text>
    <text class="lb-strong" x="0" y="188">Framework build</text>
    <rect class="fb" x="230" y="170" width="470" height="26" rx="3" data-tip="Framework build: 240 fps, 0% dropped frames, steady load at full speed. Also 240 fps while scrolling, clicking, at 2M particles and at 480k updates/s."/>
    <text x="688" y="188" text-anchor="end" class="val-in">240</text>
    <text class="lb-strong" x="0" y="230">Bare-metal build</text>
    <rect class="fc" x="230" y="212" width="470" height="26" rx="3" data-tip="Bare-metal build: 240 fps, 0% dropped frames, steady load at full speed. Also 240 fps in every other scenario."/>
    <text x="688" y="230" text-anchor="end" class="val-in">240</text>
    <line class="cap" x1="700" y1="8" x2="700" y2="250"/>
    <text class="capt" x="696" y="16" text-anchor="end">screen limit</text>
  </svg>
  <figcaption><b>Both builds hit the ceiling.</b> 240 fps was the most my screen could show, so the real headroom of both is somewhere above that. Hover or tap a bar for details.</figcaption>
</figure>

Both builds held 240 fps with zero dropped frames: under the default load, while scrolling, while clicking, with 2 million particles, and at four times the default update rate. That's double the 120 fps the idea promised for its optimized stack, and 16 to 30 times what it predicted for the normal one.

The garbage-collection stutters didn't show up either. Both builds kept only about 4 MB of JavaScript memory around. The framework build's small cleanups added up to 16 ms across a whole 15-second run, not 50–120 ms every second or two.

So did the bare-metal build win anything? Yes. It did the same job with less effort.

<figure class="chart">
  <p class="fig-title">Same frame rate, different effort</p>
  <p class="fig-sub">Default load, full speed. Lower is better for everything here.</p>
  <div class="tiles">
    <div class="tile"><div class="k">Main-thread work, in <span class="term" tabindex="0" data-tip="Milliseconds of work per second. 333 ms/s means the main thread was busy about a third of the time.">ms per second</span></div><div class="pair"><span><i class="sw-b"></i><b>333</b></span><span><i class="sw-c"></i><b>291</b></span></div><div class="d">13% less</div></div>
    <div class="tile"><div class="k">CPU used by the page's process, in <span class="term" tabindex="0" data-tip="Seconds of processor time used per second of real time. 0.74 means the page kept about three quarters of one processor core busy.">CPU-seconds per second</span></div><div class="pair"><span><i class="sw-b"></i><b>0.74</b></span><span><i class="sw-c"></i><b>0.61</b></span></div><div class="d">18% less</div></div>
    <div class="tile"><div class="k">CPU used by Chrome's <span class="term" tabindex="0" data-tip="Chrome does its drawing in a separate process that talks to the graphics card. Its CPU time costs battery too.">GPU process</span></div><div class="pair"><span><i class="sw-b"></i><b>0.67</b></span><span><i class="sw-c"></i><b>0.59</b></span></div><div class="d">12% less</div></div>
    <div class="tile"><div class="k">Code shipped to the browser, <span class="term" tabindex="0" data-tip="Gzip is the compression servers apply when sending files, so this is roughly what users actually download.">gzipped</span></div><div class="pair"><span><i class="sw-b"></i><b>196 KB</b></span><span><i class="sw-c"></i><b>21 KB</b></span></div><div class="d">9× smaller</div></div>
  </div>
  <figcaption><span style="color:var(--viz-b);font-weight:650">Indigo</span> is the framework build, <span style="color:var(--viz-c);font-weight:650">orange</span> the bare-metal build. Three things tied: a click showed up in the detail panel in 3.6 vs 3.5 ms, memory was 3.6 vs 3.7 MB, and the first frame appeared after 194 vs 187 ms.</figcaption>
</figure>

Where that headroom becomes visible is on a weaker machine. In weak-device mode both builds dipped below 240 fps, and the gap showed up as dropped frames.

<figure class="chart">
  <p class="fig-title">Dropped frames on a deliberately slowed machine</p>
  <p class="fig-sub">All of Chrome on two efficiency cores. Share of frames that missed their deadline; lower is better.</p>
  <div class="legend"><span><i class="sw-b"></i>Framework build</span><span><i class="sw-c"></i>Bare-metal build</span></div>
  <svg viewBox="0 0 720 248" class="viz" role="img" aria-label="Grouped bar chart of dropped frames in weak-device mode. Steady: framework 10.2%, bare-metal 4.5%. Scroll: 8.2% vs 2.8%. Interact: 10.1% vs 3.8%.">
    <g>
      <line class="gl" x1="130" y1="10" x2="130" y2="214"/><line class="gl" x1="258.3" y1="10" x2="258.3" y2="214"/><line class="gl" x1="386.7" y1="10" x2="386.7" y2="214"/><line class="gl" x1="515" y1="10" x2="515" y2="214"/><line class="gl" x1="643.3" y1="10" x2="643.3" y2="214"/>
      <text class="tk" x="130" y="234" text-anchor="middle">0%</text><text class="tk" x="258.3" y="234" text-anchor="middle">3%</text><text class="tk" x="386.7" y="234" text-anchor="middle">6%</text><text class="tk" x="515" y="234" text-anchor="middle">9%</text><text class="tk" x="643.3" y="234" text-anchor="middle">12%</text>
    </g>
    <text class="lb-strong" x="0" y="44">Steady</text>
    <rect class="fb" x="130" y="14" width="436.3" height="24" rx="3" data-tip="Framework build, steady: 217 fps, 10.2% of frames dropped"/>
    <text class="val" x="574" y="31">10.2%</text>
    <rect class="fc" x="130" y="40" width="192.5" height="24" rx="3" data-tip="Bare-metal build, steady: 230 fps, 4.5% of frames dropped"/>
    <text class="val" x="330" y="57">4.5%</text>
    <text class="lb-strong" x="0" y="114">Scrolling</text>
    <rect class="fb" x="130" y="84" width="350.8" height="24" rx="3" data-tip="Framework build, scrolling: 221 fps, 8.2% of frames dropped"/>
    <text class="val" x="489" y="101">8.2%</text>
    <rect class="fc" x="130" y="110" width="119.8" height="24" rx="3" data-tip="Bare-metal build, scrolling: 233 fps, 2.8% of frames dropped"/>
    <text class="val" x="258" y="127">2.8%</text>
    <text class="lb-strong" x="0" y="184">Clicking</text>
    <rect class="fb" x="130" y="154" width="432" height="24" rx="3" data-tip="Framework build, clicking a row every 400 ms: 217 fps, 10.1% of frames dropped"/>
    <text class="val" x="570" y="171">10.1%</text>
    <rect class="fc" x="130" y="180" width="162.5" height="24" rx="3" data-tip="Bare-metal build, clicking a row every 400 ms: 231 fps, 3.8% of frames dropped"/>
    <text class="val" x="300" y="197">3.8%</text>
    <line class="ax" x1="130" y1="10" x2="130" y2="214"/>
  </svg>
  <figcaption><b>Less than half the dropped frames</b>, a real win for the bare-metal build. But the framework build still averaged 217–221 fps here. Nowhere near a slideshow.</figcaption>
</figure>

## Where the gap actually came from

**Swapping halves between the two builds showed that the whole gap came from how each one updates text on the page. Rust, raw graphics code and the data format made no visible difference.**

Remember that both halves of the page were swappable? That let me mix and match: the framework grid with the bare-metal simulation, and so on. If Rust or raw WebGPU were the secret sauce, swapping the simulation should move the numbers.

<figure class="chart">
  <p class="fig-title">Mix and match: main-thread work for every combination</p>
  <p class="fig-sub">Milliseconds of work per second, steady load. Lower is better.</p>
  <div class="mix" role="table" aria-label="Main-thread work for each combination of grid and simulation">
    <div></div><div class="h" role="columnheader">Framework simulation</div><div class="h" role="columnheader">Bare-metal simulation</div>
    <div class="r" role="rowheader">Framework grid</div><div class="cell cb" role="cell"><b>333</b><small>ms/s</small></div><div class="cell cb" role="cell"><b>334</b><small>ms/s</small></div>
    <div class="r" role="rowheader">Bare-metal grid</div><div class="cell cc" role="cell"><b>293</b><small>ms/s</small></div><div class="cell cc" role="cell"><b>291</b><small>ms/s</small></div>
  </div>
  <figcaption><b>Read across a row and nothing changes; read down a column and it drops by 40.</b> The whole main-thread difference lives in the grid, the part that updates text on the page. The simulation choice barely matters.</figcaption>
</figure>

That one picture rules out most of the zero-DX recipe as the reason for the win:

- **The graphics weren't the bottleneck.** Going from 10,000 to 2 million particles cost neither side anything visible, because both ran the physics on the graphics card. Three.js's shader system and hand-written shader code were equally fast per frame. Raw WebGPU saved about 700 KB of download and a sliver of CPU, not frames.
- **JSON vs binary made no difference.** Both sides parsed incoming data in a background worker, where there's plenty of spare time, so the format never touched the main thread.
- **Rust was faster, but it didn't show.** In a <span class="term" tabindex="0" data-tip="A tiny test that times one piece of code alone, outside the real app.">microbenchmark</span>, the Rust parser was 1.9× faster than the same loop in JavaScript on binary data and 2.6× faster on JSON. But it ran in a worker that had room to spare. Moving work off the main thread is what mattered, not the language it was written in.

So what *is* the difference? Text. In Chrome, every piece of text that changes costs roughly 3.5 microseconds to lay out, 1 to shape the letters and 2 to paint. At 120,000 updates a second, that cost dominates the main thread for any grid built on the DOM, framework or not. It's a floor nobody gets under.

The bare-metal build writes each changed value straight into its text node and touches nothing else. Solid's <span class="term" tabindex="0" data-tip="Solid stores values in 'signals'. When a signal changes, only the parts of the page that read it update, with no re-render of the component.">signals</span> get most of the way there, because they also update only the exact text that changed. The last 13% is what the framework's bookkeeping costs on top.

One more myth, busted. Both builds still showed 4–7 big memory cleanups per second on the main thread. But those weren't JavaScript's. They were Chrome tidying up its own layout data after each text change. They disappear completely when the grid stops updating, and no script, framework or Rust, can touch them.

## The bigger lever: knowing the browser

**Both builds started out slow. Fixing a few browser mistakes sped them up far more than the choice between framework and no framework.**

Here's the part I find most useful. Neither build started fast.

The framework build's first correct version kept the main thread busy for 970 ms out of every second, which is almost all of it, and ran at 101 fps. That's what a "collapse" looks like in miniature. And it came from one innocent-looking CSS choice.

<figure class="chart">
  <p class="fig-title">How each build got faster</p>
  <p class="fig-sub">Main-thread work in milliseconds per second, across the experiment. Lower is better.</p>
  <div class="legend"><span><i class="sw-b"></i>Framework build</span><span><i class="sw-c"></i>Bare-metal build</span></div>
  <svg viewBox="0 0 720 340" class="viz" role="img" aria-label="Line chart. Framework build: 970 ms/s at first correct build, about 600 after its own fixes, 333 final. Bare-metal build: 445, 384, 291.">
    <g>
      <line class="gl" x1="70" y1="300" x2="690" y2="300"/><line class="gl" x1="70" y1="232.5" x2="690" y2="232.5"/><line class="gl" x1="70" y1="165" x2="690" y2="165"/><line class="gl" x1="70" y1="97.5" x2="690" y2="97.5"/>
      <text class="tk" x="58" y="304" text-anchor="end">0</text><text class="tk" x="58" y="236.5" text-anchor="end">250</text><text class="tk" x="58" y="169" text-anchor="end">500</text><text class="tk" x="58" y="101.5" text-anchor="end">750</text><text class="tk" x="58" y="34" text-anchor="end">1,000</text>
      <line class="cap" x1="70" y1="30" x2="690" y2="30"/>
      <text class="capt" x="690" y="22" text-anchor="end">main thread busy 100% of the time</text>
      <text class="tk" x="150" y="324" text-anchor="middle">First correct build</text><text class="tk" x="370" y="324" text-anchor="middle">After its own fixes</text><text class="tk" x="590" y="324" text-anchor="middle">Final, after review</text>
    </g>
    <polyline class="sb" fill="none" stroke-width="2.5" points="150,38.1 370,138 590,210.1"/>
    <polyline class="sc" fill="none" stroke-width="2.5" points="150,179.9 370,196.3 590,221.4"/>
    <circle class="fb ring" cx="150" cy="38.1" r="7" data-tip="Framework build, first correct version: 970 ms/s of main-thread work, 101 fps. Cause: ~200 restarting CSS flash animations."/>
    <circle class="fb ring" cx="370" cy="138" r="7" data-tip="Framework build after its own fixes (no CSS animations, fewer canvases, less overscan): about 600 ms/s, 240 fps."/>
    <circle class="fb ring" cx="590" cy="210.1" r="7" data-tip="Framework build, final: 333 ms/s after adopting ideas from the cross-review."/>
    <circle class="fc ring" cx="150" cy="179.9" r="7" data-tip="Bare-metal build, first correct version: about 445 ms/s."/>
    <circle class="fc ring" cx="370" cy="196.3" r="7" data-tip="Bare-metal build after moving rows into one window and dropping per-cell containment: about 384 ms/s."/>
    <circle class="fc ring" cx="590" cy="221.4" r="7" data-tip="Bare-metal build, final: 291 ms/s."/>
    <text class="val" x="166" y="42">970</text>
    <text class="val" x="384" y="130">~600</text>
    <text class="val" x="166" y="172">445</text>
    <text class="val" x="384" y="216">384</text>
    <text class="val" x="606" y="206">333</text>
    <text class="val" x="606" y="234">291</text>
  </svg>
  <figcaption><b>The framework build improved by over 600 ms/s during the experiment.</b> Even just its last stretch, from about 600 to 333, was six times bigger than the final gap between the two builds (42 ms/s).</figcaption>
</figure>

None of the big wins on either side came from the language. They came from knowing how the browser spends its time. These were the expensive mistakes:

- **Flashing cells with CSS animations.** Restarting a background-colour animation on about 200 constantly flashing cells meant Chrome juggled 200 animations every frame. Computing the colour from the frame clock instead fixed it.
- **Lots of tiny canvases.** 36 little canvases for the row charts meant about 35 separate drawing jobs for Chrome's GPU process every frame. The fix was one shared <span class="term" tabindex="0" data-tip="Canvas2D: the browser's simple drawing API. You get a rectangle of pixels and draw lines and shapes on it.">canvas</span> behind the grid, repainting only rows that changed.
- **Using WebGPU for small things.** The bare-metal build first drew the grid's little charts with WebGPU. On this Linux setup, each WebGPU canvas was surprisingly expensive for Chrome to show. Switching to a plain canvas took dropped frames from 7.5% to zero.
- **Too much isolation.** The CSS rule `contain: strict` on every cell sounds like a speedup: it tells the browser a cell can't affect anything else. In practice, it turned each cell into its own <span class="term" tabindex="0" data-tip="A separate image the browser draws and keeps for one part of the page. A few help; hundreds become overhead.">paint layer</span>, 170 to 300 of them, and in one build the browser spent 24 ms of every second just working out which cell was under the mouse. Both sides found this on their own. Putting containment on the whole row window instead works.

The cross-review helped both sides too. The bare-metal agent spotted that the framework build's per-cell styles and many paint layers were costing it. The framework agent spotted that the bare-metal build was drawing its grid graphics on a separate loop that could land one frame apart from the text. The referee also had to make two rulings, because both sides had quietly assumed things about the data that the spec didn't promise.

## The claims, one by one

**Of the idea's nine claims, two held up, though only modestly. Three were wrong, three made no visible difference, and one I couldn't test.**

<div class="tbl-wrap">
  <table>
    <thead><tr><th>The idea said</th><th>What I found</th></tr></thead>
    <tbody>
      <tr><td>A standard stack collapses to 8–15 fps</td><td><span class="chip no">Not reproduced</span><br>The optimized framework build held 240 fps under full load and at 4× the update rate. Collapse belongs to naive builds, like this one's own first version.</td></tr>
      <tr><td>Garbage collection causes 50–120 ms stutters every 1–2 s</td><td><span class="chip no">Not observed</span><br>About 4 MB of memory on both sides. The remaining big cleanups are Chrome's own, not JavaScript's.</td></tr>
      <tr><td>Zero DX wins</td><td><span class="chip yes">Yes, modestly</span><br>13–18% less CPU, less than half the dropped frames on a weak CPU, a 9× smaller download.</td></tr>
      <tr><td>WebAssembly removes the bottleneck</td><td><span class="chip meh">Faster, but invisible here</span><br>2–2.6× faster in isolation, but it ran in a worker with time to spare.</td></tr>
      <tr><td>Avoid JSON</td><td><span class="chip no">Didn't matter</span><br>No measurable difference once parsing happens in a worker.</td></tr>
      <tr><td>Use <code>contain: strict</code> everywhere</td><td><span class="chip no">Harmful per cell</span><br>Hundreds of paint layers. Contain the row window instead.</td></tr>
      <tr><td>Raw WebGPU beats Three.js</td><td><span class="chip meh">Same speed</span><br>No frame-rate difference. Raw wins about 700 KB of download.</td></tr>
      <tr><td>Write text nodes directly</td><td><span class="chip yes">Where the gap comes from</span><br>But Solid's fine-grained updates get most of the way. React would likely land further back; I didn't test it.</td></tr>
      <tr><td>Tiny first download, faster network protocols</td><td><span class="chip na">Not tested</span><br>Localhost can't measure the network honestly. On a phone network, the 9× size gap would matter.</td></tr>
    </tbody>
  </table>
</div>

## The twist: what it cost the AI agents

**Building each version cost the AI about the same. Adding a feature later took about 40% fewer tokens in the no-framework code, because the change touched 4 files instead of about 15.**

Since AI agents built both sides, "DX" gets a second meaning: how easy is this code for the *next agent* to change? I measured that by counting <span class="term" tabindex="0" data-tip="The chunks of text an AI model reads and writes. Usage is billed per token, so tokens are a decent stand-in for cost.">tokens</span> in the agents' logs, combined into one number I'll call <span class="term" tabindex="0" data-tip="Every kind of token counted at its price ratio: fresh input 1, cached input 0.1, writing to cache 1.25, output 5. One number that tracks cost.">weighted tokens</span>.

**Building from scratch cost the same.** The framework build took 6.73 million weighted tokens, the bare-metal build 6.82 million, with 159 model calls each. Writing Rust and raw WebGPU didn't cost the agent more tokens, though it did take longer: about 95 minutes against 74.

**Changing the code did not cost the same.** I gave fresh agents a feature that cuts through every layer: sortable columns that keep re-sorting as prices change, plus a glow in the simulation on the selected stock's sector. Same model, identical instructions, and they weren't told they were being measured. Four independent runs per side, each starting from the same code.

<figure class="chart">
  <p class="fig-title">Cost of adding one feature, four runs per side</p>
  <p class="fig-sub">Weighted tokens per run, in millions. Lower is cheaper.</p>
  <svg viewBox="0 0 720 200" class="viz" role="img" aria-label="Dot plot. Framework build runs: 1.21, 0.93, 0.84, 0.93 million weighted tokens, median 0.93. Bare-metal runs: 0.90, 0.53, 0.50, 0.55, median 0.54.">
    <g>
      <line class="gl" x1="160" y1="20" x2="160" y2="160"/><line class="gl" x1="270" y1="20" x2="270" y2="160"/><line class="gl" x1="380" y1="20" x2="380" y2="160"/><line class="gl" x1="490" y1="20" x2="490" y2="160"/><line class="gl" x1="600" y1="20" x2="600" y2="160"/><line class="gl" x1="710" y1="20" x2="710" y2="160"/>
      <text class="tk" x="160" y="182" text-anchor="middle">0</text><text class="tk" x="270" y="182" text-anchor="middle">0.25</text><text class="tk" x="380" y="182" text-anchor="middle">0.5</text><text class="tk" x="490" y="182" text-anchor="middle">0.75</text><text class="tk" x="600" y="182" text-anchor="middle">1.0</text><text class="tk" x="710" y="182" text-anchor="middle">1.25M</text>
    </g>
    <text class="lb-strong" x="0" y="64">Framework build</text>
    <text class="note" x="0" y="82">median 0.93M</text>
    <line x1="569.2" y1="38" x2="569.2" y2="90" stroke="var(--viz-b)" stroke-width="2" opacity=".55"/>
    <circle class="fb ring" cx="692.4" cy="64" r="8" data-tip="Framework run 1: 1.21M weighted tokens, 59 calls, 15.4 min (this run also diagnosed a bug in the referee's sort check)"/>
    <circle class="fb ring" cx="569.2" cy="56" r="8" data-tip="Framework run 2: 0.93M weighted tokens, 46 calls, 24.0 min"/>
    <circle class="fb ring" cx="529.6" cy="64" r="8" data-tip="Framework run 3: 0.84M weighted tokens, 47 calls, 25.8 min"/>
    <circle class="fb ring" cx="569.2" cy="72" r="8" data-tip="Framework run 4: 0.93M weighted tokens, 43 calls, 21.2 min"/>
    <text class="lb-strong" x="0" y="124">Bare-metal build</text>
    <text class="note" x="0" y="142">median 0.54M</text>
    <line x1="397.6" y1="98" x2="397.6" y2="150" stroke="var(--viz-c)" stroke-width="2" opacity=".55"/>
    <circle class="fc ring" cx="556" cy="124" r="8" data-tip="Bare-metal run 1: 0.90M weighted tokens, 47 calls, 21.1 min (waited mid-task for a fix to the test setup from the referee)"/>
    <circle class="fc ring" cx="393.2" cy="116" r="8" data-tip="Bare-metal run 2: 0.53M weighted tokens, 26 calls, 8.5 min"/>
    <circle class="fc ring" cx="380" cy="130" r="8" data-tip="Bare-metal run 3: 0.50M weighted tokens, 27 calls, 10.1 min"/>
    <circle class="fc ring" cx="402" cy="124" r="8" data-tip="Bare-metal run 4: 0.55M weighted tokens, 27 calls, 17.2 min"/>
  </svg>
  <figcaption><b>About 40% fewer tokens for the bare-metal build</b> (median 0.54 million against 0.93 million), with about 40% fewer model calls and less time. Three of its four runs were cheaper than every framework run. Hover a dot for that run's details.</figcaption>
</figure>

In fairness, the runs weren't perfectly clean. One framework run found and diagnosed a timing bug in the referee's own sort check. During another, the bare-metal agent ran a cleanup command that also killed the framework agent's test server. The pairs also shared one graphics card. But even if you throw out the messy runs, the gap holds: the framework runs never went below 0.84 million, and the clean bare-metal runs sat at 0.50–0.55.

### Why the plain code was cheaper to change

It isn't simply that the bare-metal code is smaller. In bytes, the two codebases are close: 64 KB for the framework build, 55 KB for the bare-metal one. The difference is *shape*.

<figure class="chart">
  <p class="fig-title">Files each agent touched to add the same feature</p>
  <p class="fig-sub">One block per code file. Every run on a side touched about the same set.</p>
  <div class="files">
    <div class="who"><b>Framework build</b>14–15 files</div>
    <div class="sq b" aria-label="14 to 15 files"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="maybe"></i></div>
    <div class="num">about 300 lines added, 55 removed</div>
    <div class="who"><b>Bare-metal build</b>4 files</div>
    <div class="sq c" aria-label="4 files"><i></i><i></i><i></i><i></i></div>
    <div class="num">about 105 lines added, 35 removed</div>
  </div>
  <figcaption>The faded block is the fifteenth file that some framework runs touched and others didn't.</figcaption>
</figure>

The bare-metal build keeps each job in one place: one file runs the grid's frame loop, one file paints it. To add sorting, the agent added a single list mapping row positions to stocks, read by both, plus one value passed to the shader for the glow.

The framework build, written the idiomatic way, spreads each job over many files: components for the grid, the row, the header and the graphics, plus hooks, state modules, a data module, CSS and the worker. The same feature needed a sort model, a new hook, plumbing to lift the selection up to the top of the app, header buttons, painter bookkeeping, a highlight module, and changes to the 3D materials in three places.

For an agent, every file it has to understand costs reads, and every file it changes costs edits and re-checks. That's where the tokens went.

## What this doesn't show

**This was one laptop, one framework and one feature, so treat the results as a strong hint, not a rule.**

I want to be clear about the limits, because it's easy to over-read one experiment:

- **One machine, with a strong graphics card.** Weak-device mode slowed the CPU, not the GPU. Nothing ran on a phone.
- **Localhost only.** The network wasn't part of the test, so the 9× download gap is reported but not felt.
- **Solid is the best case for frameworks.** The framework agent picked it because it updates only what changed. A React or Vue build would probably sit further back.
- **Shared ideas.** The referee passed tricks between sides on purpose, so neither build is fully independent.
- **The referee is an AI too.** It wrote the test setup and chose the feature. I aimed the feature at every layer so it wouldn't favour either side, but it's still one choice.
- **The agent-cost result is narrow.** One feature, four runs per side, and the initial build is a single run each. A bigger app with many screens, a big refactor, or a human team taking over could flip it. Those are exactly the situations framework conventions exist for.
- **Code quality wasn't judged.** Only behaviour was checked. Whether a human team could happily maintain the bare-metal code is an open question.

## What I'm taking away

**The framework didn't make the app slow; not knowing the browser did. The no-framework code's real advantage was that it was cheaper for AI agents to change.**

**The headline claim fails.** A framework stack in the hands of someone who knows the browser doesn't collapse. It used only 13–18% more CPU than the zero-DX stack. The 8 fps story is a story about naive builds.

**Knowing the browser is the bigger lever.** The largest improvements on both sides came from understanding where Chrome spends time: one canvas instead of hundreds of animations or many small canvases, containment at the right level, heavy work moved into workers. An agent that knows those things gets most of the speed in either stack.

**Rust and raw WebGPU bought bytes, not frames.** Their speedups were real when measured alone, and invisible in the full app at this load.

**The real difference is maintenance cost for agents.** When agents build and maintain the code, a framework's one-file-per-concept structure is paid for in tokens on every change. Here the flat code needed about 40% fewer tokens per feature, at no cost in speed. That doesn't mean "throw out your framework". It means that if agents are doing most of the edits, flat and cohesive code is cheaper for them to work in, and that's worth knowing when you decide how to structure a project.

## FAQ

<div class="faq">
  <details>
    <summary>So should I drop my framework?</summary>
    <p>No. The framework build ran at full speed under a load far heavier than most dashboards will ever see. If your app is slow, the fix is much more likely to be in how it uses the browser (animations, canvases, layout work, what runs on the main thread) than in the framework itself.</p>
  </details>
  <details>
    <summary>Is WebAssembly pointless for web apps, then?</summary>
    <p>Not at all. The Rust parser was 2–2.6× faster than JavaScript doing the same job. It just didn't matter here, because that job ran in a background worker that had plenty of spare time. If your heavy work sits on the main thread, or a worker is genuinely maxed out, WebAssembly can absolutely pay off.</p>
  </details>
  <details>
    <summary>Why did you get 240 fps when the claim talked about 120?</summary>
    <p>My laptop's screen refreshes 240 times a second, and the browser draws at the screen's pace. Both builds hit that ceiling, which is why I compared CPU work and ran a weak-device mode to see the difference between them.</p>
  </details>
  <details>
    <summary>Why Solid and not React?</summary>
    <p>The framework agent chose it, as the option best suited to a grid that changes thousands of times a second. That makes this the strongest case for "good DX". A React build would likely do somewhat worse; I didn't test one, so I can't tell you by how much.</p>
  </details>
  <details>
    <summary>Would the results be different on a phone?</summary>
    <p>Possibly. I only tested one laptop, and my weak-device mode slowed the CPU but not the graphics card. On a phone network, the bare-metal build's 9× smaller download would also be a real advantage that localhost can't show.</p>
  </details>
  <details>
    <summary>How do you know the agents didn't cheat to look fast?</summary>
    <p>Every single run was checked for correct output: a fingerprint of all the final data, the exact visible text, and the history of five stocks. A wrong but fast run counted as a failure. On top of that, each agent reviewed the other's code specifically looking for rule breaks.</p>
  </details>
  <details>
    <summary>Does the agent-cost result mean agents prefer messy code?</summary>
    <p>Not messy: flat. The bare-metal code kept each concern in one or two files, so a change touched four files instead of fifteen. That's one feature, measured four times per side, so treat it as a strong hint rather than a law. Larger apps or human teams might tip the balance back toward framework structure.</p>
  </details>
  <details>
    <summary>What's the one thing I should take from this?</summary>
    <p>Before you rewrite in a different stack for speed, profile. In this experiment, the biggest wins came from fixing how the page used the browser, and those fixes worked just as well with a framework as without one.</p>
  </details>
</div>

> [!NOTE]
> **A note on who wrote this.** This post, including its charts and diagrams, was written by an AI model: **Claude Opus 5.5** by Anthropic (model ID `claude-opus-5-5`), working from my experiment's technical report and measured data. After I read it, the same model revised the title, the summary and the section overviews from my comments.
>
> The experiment itself was also built by AI agents under my direction: one per build, plus a coordinating referee agent that wrote the test setup and the report. Every number here comes from that test setup, not from the agents' own claims.
