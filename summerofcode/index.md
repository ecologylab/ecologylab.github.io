# S.IM.PL JavaScript
Mentor: Tom White

## Deliverables:


# Managing Web Semantics in JavaScript
Mentor: Nic

The Managing Web Semantics in JavaScript project focuses on extracting,
understanding, and visualizing web semantics(metadata) within a web
applications or browser plugins. The deliverables of this project are centered
around increasing the stability, functionality, and interoperability of the
[Metadata Extractor][3] browser plugin and the [In-Context Expander (ICE)][4]
dynamic interface in HTML5.

The Metadata Extractor is a browser plugin which parses the DOM of web pages as
your browse to extract metadata using the BigSemantic’s [Meta-Metadata][5].
Currently available for Chrome and Firefox the plugin exposes the extracted
metadata to other web or desktop applications through HTML5 data injection on
[DataTransfer events][6].

ICE is a dynamic interface which renders web semantics in HTML5. The interface
allows for users to browse and navigate to linked web semantics. The student
will design and create new dynamic interfaces. Different dynamic interfaces
will share significant implementation with ICE but should be novel in how they
visualize the data and how the user navigates to connected web semantics.

This project is part of the Interface Ecology Lab’s open source [BigSemantics
toolkit][1] , specifically [BigSemantics JavaScript][2].

## Deliverables:

* Metadata Extractor Pt. 1
	* Test cases and testing framework
	* Validate XPath parsing
	* Direct path parsing
* S.IM.PL
	* De/serializing metadata Documents
* BigSemantics
	* Implement / port URL selector
	* URL to MetaMetadata resolution
	* Document comparison & concatenator
* Metadata Extractor Pt. 2
	* Incorporate SIMPL de/serialization
	* Incorporate URL to MetaMetadata resolution using the MMD repository JSON
	  file
* Dynamic Interfaces for Web Semantics (stretch deliverable)
	* Design and create novel dynamic interfaces

[1]: https://github.com/ecologylab/BigSemantics/wiki
[2]: https://github.com/ecologylab/BigSemanticsJavaScript
[3]: https://github.com/ecologylab/BigSemanticsJavaScript/tree/master/metadataExtractor
[4]: https://github.com/ecologylab/BigSemantics/wiki/In-Context-Expander-%28ICE%29
[5]: http://ecologylab.net/research/simplGuide/metaMetadata/index.html
[6]: http://www.w3.org/TR/2011/WD-html5-20110113/dnd.html


# CouchDB backends for the BigSemantics service and indexes (if not done by REU)
Mentor: Yin Qu

This project develops a scalable data storage and indexing system for the
BigSemantics service. The system will provide the service with a scalable data
storage to store accessed web pages and extracted semantics, to improve
performance. It will also automatically construct indexes and aggregations on
relevant fields, which will be further used to support critical interactions
with semantics, such as filtering, searching, and faceted browsing.

## Deliverables:

* Implementation of the current interfaces (FileStorage, DocumentStore) using
  CouchDB.
* Supporting specifying index and facet on meta-metadata.
* Automatically building and updating indexes for fields with index or facets.
* Demo application that uses indexes and facets for viewing metadata.


# Meta-metadata change detector service
Mentor: Yin

This project provides a service which regularly checks for changes in
meta-metadata curated web sites that affect meta-metadata extraction, and
notifies the community for actions on these meta-metadata.

## Deliverables:

* A mechanism that scans <example_url>s, downloads corresponding pages,
  extracts metadata, and stores both the page and the metadata in a versioned
  data store. The products are ‘snapshots’ of information resources and
  corresponding metadata, that we can compare to later. It should also warn if
  an <example_url> becomes non-accessible.
* A tool that compares two metadata objects for differences.
* A module that takes snapshots, extracts metadata objects again, and compares
  with metadata objects in those snapshots.
* Dynamic web pages that summarize and list changes that need to be made.
* Deployment of the service, cron job, and emailing notifications.


# BigSemantics Citation Chaining Service Client Libraries (C#?)
Mentor: Andrew Webb

This project develops a client side library for the BigSemantics service in C#.
The library will provide an easy way to asynchronously extracts a web of
metadata and caches them on the local machine for best performance,
persistently. The library allows for even simpler invocation of the service,
without the need for process HTTP requests and responses. Code structure and
modularization of BigSemantics need to be considered.

## Deliverables:

* Encapsulating BigSemantics service invocation and callback.
* Implementing asynchronous expansion of a web of metadata on the client side.
* Add a persistent cache on the local machine.


# BigSemantics: Curation of Popular Culture
Mentor: Andruid Kerne

This project develops popular perspectives in web semantics in order to involve
the general public, especially young people, in new experiences of collecting,
presenting, and sharing information. Curation is the process of developing a
conceptual focus, and selecting and connecting significant information that
expresses the chosen concepts. Each REU student assigned to this project will
identify a cultural area significant to her / him, and work on the curation of
semantic information in this area. Examples of potential popular culture areas
include fashion, sports, music, entertainment, skateboarding, DIY, crafts,
design, and dance.

The goal of this semantics curation is to make information in these popular
culture areas available to people in new ways, to catalyze new expressions,
uses, and communities involving the information. Curating semantics involves
identifying cultural areas of information on the web that matter to particular
groups of people, defining data structures to best represent this information,
identifying template-driven web sites that publish data that can be used to
instantiate the data structures, and defining XPath and regular expressions
that extract information from the web sites. This involves using the Interface
Ecology Lab’s open source [BigSemantics
toolkit](https://github.com/ecologylab/BigSemantics/wiki) and [ICE presentation
tool](http://ecologylab.net//ice).

The project involves using social media to coalesce user communities around new
visual semantic presentations in the area of popular culture that the student
curates.

More than one student can work on this project, assuming that each works on a
different area of popular culture. These areas and their associated students
can fruitfully intersect.

## Deliverables:

* Develop reusable semantic data models for areas of popular culture, using
  Meta-Metadata.
* Develop selectors and wrappers for specific web sites.
* Build fun tutorial applicationsl / demo  in DHTML incorporating ICE and
  popular culture.
* Alternative dynamic metadata visualizations using D3.
* Produce clear documentation in the BigSemantics Wiki.


# Rich Placemarks

We need methods to facilitate presenting rich heterogeneous metadata on maps.
Rich metadata consists of descriptions and relational associative links,
derived from web pages, such as a movie, its actors and their movies, and a
historical site, its significant events and artifacts, and other related
events, sites, and artifacts.

The Interface Ecology Lab’s open source BigSemantics project has developed
tools for wrappers that represent the data models for rich metadata, extraction
rules for particular web sites and other sources, and hints for presentation. A
repository of wrappers covers many popular web sites. BigSemantics also already
includes components for presenting this rich metadata in JavaScript, Java, and
C# / WinRT. The [ICE presentation tool](http://ecologylab.net//ice) is an
example.

This project will develop tools and examples for representing rich metadata
instances, each associated with a GPS location, on maps, to be known as rich
placemarks. The instances of metadata for places that go on the map could be
curated in advance, or collected ad hoc by drag and drop. This will be
accomplished by integrating BigSemantics, ICE, and OpenStreetMaps (and perhaps
Google Maps). 

## Deliverables:

* Extend and develop reusable semantic data models for places, using
  Meta-Metadata.
* Develop selectors and wrappers for specific web sites that present mappable
  locations.
* Develop an integration of OpenStreetMaps and ICE, which enables interaction
  with rich place-oriented metadata on a map.
* Build fun tutorial / demo applications in DHTML incorporating ICE with
  popular culture, such as mashups involving TripAdvisor, Expedia, and
  WIkipedia.
* Produce clear documentation in the BigSemantics and ICE Wikis.

The developer needs experience with HTML5, JSON, and interaction design. Source
code is organized with Git.

