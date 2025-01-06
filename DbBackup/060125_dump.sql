--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: oscar
--

CREATE TABLE public.vehicles (
    id integer NOT NULL,
    number_plate character varying,
    longitude character varying,
    altitude character varying,
    created_at timestamp with time zone,
    type character varying,
    location character varying,
    latitude character varying
);


ALTER TABLE public.vehicles OWNER TO oscar;

--
-- Name: Vehicles_id_seq; Type: SEQUENCE; Schema: public; Owner: oscar
--

CREATE SEQUENCE public."Vehicles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vehicles_id_seq" OWNER TO oscar;

--
-- Name: Vehicles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oscar
--

ALTER SEQUENCE public."Vehicles_id_seq" OWNED BY public.vehicles.id;


--
-- Name: fleets; Type: TABLE; Schema: public; Owner: oscar
--

CREATE TABLE public.fleets (
    id integer NOT NULL,
    fleet_id character varying,
    fleet_name character varying,
    created_at timestamp with time zone,
    vehicles character varying[]
);


ALTER TABLE public.fleets OWNER TO oscar;

--
-- Name: fleets_id_seq; Type: SEQUENCE; Schema: public; Owner: oscar
--

CREATE SEQUENCE public.fleets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fleets_id_seq OWNER TO oscar;

--
-- Name: fleets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oscar
--

ALTER SEQUENCE public.fleets_id_seq OWNED BY public.fleets.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: oscar
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    latitude character varying,
    longitude character varying,
    altitude character varying,
    vehicle character varying
);


ALTER TABLE public.locations OWNER TO oscar;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: oscar
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO oscar;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oscar
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: fleets id; Type: DEFAULT; Schema: public; Owner: oscar
--

ALTER TABLE ONLY public.fleets ALTER COLUMN id SET DEFAULT nextval('public.fleets_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: oscar
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: vehicles id; Type: DEFAULT; Schema: public; Owner: oscar
--

ALTER TABLE ONLY public.vehicles ALTER COLUMN id SET DEFAULT nextval('public."Vehicles_id_seq"'::regclass);


--
-- Data for Name: fleets; Type: TABLE DATA; Schema: public; Owner: oscar
--

COPY public.fleets (id, fleet_id, fleet_name, created_at, vehicles) FROM stdin;
687	m5k7406qpquevp1uqzj	Oscar	2025-01-05 23:39:49.492278+01	{586}
688	m5k7408hqnwh5a6twe	Oscar	2025-01-05 23:39:49.553324+01	{587}
690	m5k740a1bj17wo54l76	Hector	2025-01-05 23:39:49.60937+01	{588}
689	m5k7409xufxtxioa36	Oscar	2025-01-05 23:39:49.605837+01	{588}
691	m5k740bgzxxiguam0e	Oscar	2025-01-05 23:39:49.660201+01	{589}
692	m5k740chei80ayu2ze	Oscar	2025-01-05 23:39:49.697951+01	{590}
693	m5ky6x8mrgvjbtkp1yd	Oscar	2025-01-06 12:17:55.272265+01	{591}
694	m5ky6x9e1ey5wku2qsv	Oscar	2025-01-06 12:17:55.298973+01	{592}
696	m5ky6xa68uwnm3ija0t	Hector	2025-01-06 12:17:55.326857+01	{593}
695	m5ky6xa2hrrybm06lsj	Oscar	2025-01-06 12:17:55.322932+01	{593}
697	m5ky6xassg3sh01uqhb	Oscar	2025-01-06 12:17:55.348356+01	{594}
698	m5ky6xbm5sdurwnp7o3	Oscar	2025-01-06 12:17:55.378514+01	{595}
699	m5kyg9vntqd54cie1pl	Oscar	2025-01-06 12:25:11.556455+01	{596}
700	m5kyg9wicq6lc5j021g	Oscar	2025-01-06 12:25:11.586964+01	{597}
702	m5kyg9x97l3c433ykct	Hector	2025-01-06 12:25:11.613643+01	{598}
701	m5kyg9x5t3papn7iryc	Oscar	2025-01-06 12:25:11.610099+01	{598}
703	m5kyg9xwhnxb96v3kwh	Oscar	2025-01-06 12:25:11.636454+01	{599}
704	m5kyg9yqptgc0bgopzb	Oscar	2025-01-06 12:25:11.666371+01	{600}
705	m5kyhec87jyzmcoxoq6	Oscar	2025-01-06 12:26:03.993868+01	{601}
706	m5kyhed4pnbahdpvm8o	Oscar	2025-01-06 12:26:04.025179+01	{602}
708	m5kyhee30t9qm6inwmyl	Hector	2025-01-06 12:26:04.059406+01	{603}
707	m5kyhedzkwu8v6jvq9f	Oscar	2025-01-06 12:26:04.055366+01	{603}
709	m5kyheepawgy23hfnqe	Oscar	2025-01-06 12:26:04.082041+01	{604}
710	m5kyhefjhbppxw0bcy5	Oscar	2025-01-06 12:26:04.111698+01	{605}
711	m5kynqa634flzaavjf9	Oscar	2025-01-06 12:30:59.408435+01	{606}
712	m5kynqbavy69kyww73c	Oscar	2025-01-06 12:30:59.446798+01	{607}
714	m5kynqc0qt1xos2fnwk	Hector	2025-01-06 12:30:59.47261+01	{608}
713	m5kynqbwen03uvx2b2	Oscar	2025-01-06 12:30:59.469189+01	{608}
715	m5kynqcpxbkh37n4e4	Oscar	2025-01-06 12:30:59.497569+01	{609}
716	m5kynqdi91eb992qqga	Oscar	2025-01-06 12:30:59.526215+01	{610}
717	m5kypt1h2jhqts1fvvp	Oscar	2025-01-06 12:32:36.294477+01	{611}
718	m5kypt2gcosjwm53del	Oscar	2025-01-06 12:32:36.329028+01	{612}
720	m5kypt38qho61x9g4ck	Hector	2025-01-06 12:32:36.35693+01	{613}
719	m5kypt34vh60au24pc8	Oscar	2025-01-06 12:32:36.352949+01	{613}
721	m5kypt3vnt3olxqyv3	Oscar	2025-01-06 12:32:36.38013+01	{614}
722	m5kypt4xl9exqak2sdh	Oscar	2025-01-06 12:32:36.417562+01	{615}
723	m5kyqfyy1kdmjuesyq7	Oscar	2025-01-06 12:33:06.011579+01	{616}
724	m5kyqfzuywmytx0696	Oscar	2025-01-06 12:33:06.042423+01	{617}
726	m5kyqg0n7vbl8h9mt08	Hector	2025-01-06 12:33:06.071324+01	{618}
725	m5kyqg0ipie1w4ein9r	Oscar	2025-01-06 12:33:06.067171+01	{618}
727	m5kyqg1jtz5mp9wctm	Oscar	2025-01-06 12:33:06.103657+01	{619}
728	m5kyqg2jw9ysoo4nqu	Oscar	2025-01-06 12:33:06.139368+01	{620}
729	m5kysure1t2nrf133u2	Oscar	2025-01-06 12:34:58.49173+01	{621}
730	m5kysusl5qhb04m6ovl	Oscar	2025-01-06 12:34:58.533415+01	{622}
732	m5kysutfct0l1ek43re	Hector	2025-01-06 12:34:58.564019+01	{623}
731	m5kysutcq0p8xbnbow	Oscar	2025-01-06 12:34:58.560926+01	{623}
733	m5kysuu31yg65xyhaw1	Oscar	2025-01-06 12:34:58.587672+01	{624}
734	m5kysuuxtsfgwkvqdhf	Oscar	2025-01-06 12:34:58.61803+01	{625}
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: oscar
--

COPY public.locations (id, latitude, longitude, altitude, vehicle) FROM stdin;
47	12	-60	1000	589
48	12	-60	1000	\N
49	12	-60	1000	594
50	12	-60	1000	595
51	12	-60	1000	599
52	12	-60	1000	600
53	12	-60	1000	604
54	12	-60	1000	605
55	12	-60	1000	609
56	12	-60	1000	610
57	12	-60	1000	614
58	12	-60	1000	615
59	12	-60	1000	619
60	12	-60	1000	620
61	12	-60	1000	624
62	12	-60	1000	625
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: oscar
--

COPY public.vehicles (id, number_plate, longitude, altitude, created_at, type, location, latitude) FROM stdin;
586	XQ-672-81	44	340	2025-01-05 23:39:49.505728+01	Car	\N	\N
587	XQ-672-81	44	340	2025-01-05 23:39:49.556804+01	Car	\N	\N
588	XQ-672-81	44	340	2025-01-05 23:39:49.619908+01	Car	\N	\N
589	XQ-672-81	44	340	2025-01-05 23:39:49.662883+01	Car	47	\N
590	XQ-672-81	44	340	2025-01-05 23:39:49.700759+01	Car	\N	\N
591	XQ-672-81	44	340	2025-01-06 12:17:55.277573+01	Car	\N	60
592	XQ-672-81	44	340	2025-01-06 12:17:55.30289+01	Car	\N	60
593	XQ-672-81	44	340	2025-01-06 12:17:55.328871+01	Car	\N	60
594	XQ-672-81	44	340	2025-01-06 12:17:55.350939+01	Car	49	60
595	XQ-672-81	44	340	2025-01-06 12:17:55.381082+01	Car	50	60
596	XQ-672-81	44	340	2025-01-06 12:25:11.563026+01	Car	\N	60
597	XQ-672-81	44	340	2025-01-06 12:25:11.590207+01	Car	\N	60
598	XQ-672-81	44	340	2025-01-06 12:25:11.616192+01	Car	\N	60
599	XQ-672-81	44	340	2025-01-06 12:25:11.639727+01	Car	51	60
600	XQ-672-81	44	340	2025-01-06 12:25:11.66968+01	Car	52	60
601	XQ-672-81	44	340	2025-01-06 12:26:04.002599+01	Car	\N	60
602	XQ-672-81	44	340	2025-01-06 12:26:04.02881+01	Car	\N	60
603	XQ-672-81	44	340	2025-01-06 12:26:04.061392+01	Car	\N	60
604	XQ-672-81	44	340	2025-01-06 12:26:04.08544+01	Car	53	60
605	XQ-672-81	44	340	2025-01-06 12:26:04.114927+01	Car	54	60
606	XQ-672-81	44	340	2025-01-06 12:30:59.416129+01	Car	\N	60
607	XQ-672-81	44	340	2025-01-06 12:30:59.449633+01	Car	\N	60
608	XQ-672-81	44	340	2025-01-06 12:30:59.474727+01	Car	\N	60
609	XQ-672-81	44	340	2025-01-06 12:30:59.500318+01	Car	55	60
610	XQ-672-81	44	340	2025-01-06 12:30:59.529579+01	Car	56	60
611	XQ-672-81	44	340	2025-01-06 12:32:36.302403+01	Car	\N	60
612	XQ-672-81	44	340	2025-01-06 12:32:36.332057+01	Car	\N	60
613	XQ-672-81	44	340	2025-01-06 12:32:36.358971+01	Car	\N	60
614	XQ-672-81	44	340	2025-01-06 12:32:36.383443+01	Car	57	60
615	XQ-672-81	44	340	2025-01-06 12:32:36.420819+01	Car	58	60
616	XQ-672-81	44	340	2025-01-06 12:33:06.017787+01	Car	\N	60
617	XQ-672-81	44	340	2025-01-06 12:33:06.046304+01	Car	\N	60
618	XQ-672-81	44	340	2025-01-06 12:33:06.078054+01	Car	\N	60
619	XQ-672-81	44	340	2025-01-06 12:33:06.106499+01	Car	59	60
620	XQ-672-81	44	340	2025-01-06 12:33:06.142374+01	Car	60	60
621	XQ-672-81	44	340	2025-01-06 12:34:58.500068+01	Car	\N	60
622	XQ-672-81	44	340	2025-01-06 12:34:58.536445+01	Car	\N	60
623	XQ-672-81	44	340	2025-01-06 12:34:58.566109+01	Car	\N	60
624	XQ-672-81	44	340	2025-01-06 12:34:58.591417+01	Car	61	60
625	XQ-672-81	44	340	2025-01-06 12:34:58.621458+01	Car	62	60
\.


--
-- Name: Vehicles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public."Vehicles_id_seq"', 625, true);


--
-- Name: fleets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public.fleets_id_seq', 734, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public.locations_id_seq', 62, true);


--
-- Name: vehicles Vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: oscar
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT "Vehicles_pkey" PRIMARY KEY (id);


--
-- Name: fleets fleets_pkey; Type: CONSTRAINT; Schema: public; Owner: oscar
--

ALTER TABLE ONLY public.fleets
    ADD CONSTRAINT fleets_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

