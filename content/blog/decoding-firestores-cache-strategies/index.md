+++
title = "Decoding Firestore's Cache Strategies"
description = "Dive into the intricacies of Firestore's cache strategies as we journey through real-world examples. Discover how to optimize Firestore for performance and resilience, with a dash of humor to keep things light-hearted"
date = 2023-06-06

[extra]
seo_title = "Master Firestore's Cache Strategies - A Comprehensive Guide"
featured_image = "cover-saito200-spacescape-a-sea-of-galaxies-outer-space-stars-cons.webp"
show_featured_image = true
+++

I'll tell you what, I didn't know there was a Firestore's cache behavior out of the box. So I read about about it, and I want to share it, let's get right into it!

## Exploring Firestore's Cache Strategies

Firestore gives us the power to configure cache behavior with a simple tool - GetOptions. In our toolbox, we've got three cache strategies.

1. **Default**: This little trooper attempts to fetch the latest data from the Firestore server. But, you know what? If it can't reach the server (because hey, things happen), it won't leave you hanging. It returns the data from the cache. Reliable, isn't it?
2. **Server**: The server strategy is a bit more, shall we say, focused. It only fetches from the Firestore server. If it can't reach the server, it throws in the towel. It's all or nothing with this one.
3. **Cache**: Lastly, we have the cache strategy. It only fetches from the cache and will accept defeat if the document isn't in the cache. It's got a one-track mind, but it sure is good at what it does.

Now, wouldn't it be fun to see this in action? Take a look at this code snippet:

```javascript
import { getDoc, doc, getFirestore, GetOptions } from "firebase/firestore";

const db = getFirestore();
const docRef = doc(db, "collection", "documentId");

// Create a GetOptions object
const options: GetOptions = {
  source: "cache" // You can also use "default" or "server"
};

// Get the document, forcing the SDK to fetch from the cache.
getDoc(docRef, options).then((docSnapshot) => {
  if (docSnapshot.exists()) {
    console.log("Document data:", docSnapshot.data());
  } else {
    console.log("No such document!");
  }
}).catch((error) => {
  console.error("Error getting document:", error);
});
```

## Decoding Stale Cache Data

Now, you might be wondering, "How does Firestore determine if cache data is stale or not?" Good question! Firestore doesn't give us explicit controls for this. Instead, it's always keeping our cache synchronized with the server whenever our network connection is on point.

Firestore tries its best to provide up-to-date results from the cache when you perform a query. But, if the required data is not available or if it thinks the cache data may be a bit behind the times (like, it's been awhile since the last synchronization), it'll attempt to fetch the fresh data from the server.

## A Quick Note on Offline Persistence

Before we wrap up, let's not forget about offline persistence. Firestore offers offline support for mobile (iOS and Android) and web clients. Just remember, offline persistence is not a fan of Node.js client libraries - it's not supported there.

On Android and iOS, offline persistence is enabled by default (convenient, eh?), but on the web, it likes to be formally invited - you've got to enable it explicitly. Also, Firestore is a self-starter and manages the offline cache, including deleting older, unused data. But if you want to get your hands dirty, you can manually clear the cache.

For the finer details and limitations of Firestore offline persistence, you'd do well to refer to the [official Firestore documentation](https://firebase.google.com/docs/firestore/manage-data/enable-offline).

Hope this helped!
