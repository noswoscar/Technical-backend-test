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
    created_at timestamp with time zone,
    type character varying,
    location character varying
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
1222	m5phm4sxbqmc3eg8coc	Oscar	2025-01-09 16:32:42.322344+01	{917}
1223	m5phm4tsjkr7n7y9lyj	Oscar	2025-01-09 16:32:42.352484+01	{918}
1225	m5phm4uk5khqd0ahxrw	Hector	2025-01-09 16:32:42.380368+01	{919}
1224	m5phm4ugfjl0sxsrzvt	Oscar	2025-01-09 16:32:42.376416+01	{919}
1226	m5phm4v6qejezamwvw	Oscar	2025-01-09 16:32:42.402967+01	{920}
1227	m5phm4w3vsyvg3esxhd	Oscar	2025-01-09 16:32:42.435914+01	{921}
1229	m5phovyuge50e1lp70w	Other2	2025-01-09 16:34:50.838832+01	{}
1230	m5php73b38mcztnu7od	Other2	2025-01-09 16:35:05.256369+01	{919,917}
1231	m5phrbrybvj6kx1eunb	Oscar	2025-01-09 16:36:44.639578+01	{922}
1232	m5phrbsxtps5vw6le8c	Oscar	2025-01-09 16:36:44.673314+01	{923}
1234	m5phrbtpjm29wqmm7as	Hector	2025-01-09 16:36:44.702055+01	{924}
1233	m5phrbtlv1ihwr04lx	Oscar	2025-01-09 16:36:44.698067+01	{924}
1235	m5phrbucf46egz1jb2u	Oscar	2025-01-09 16:36:44.72481+01	{925}
1236	m5phrbv5se28m7oach	Oscar	2025-01-09 16:36:44.753623+01	{926}
1237	m5pml7mi96qp4tm3p6	Oscar	2025-01-09 18:51:57.403895+01	{927}
1238	m5pml7nglxq8xy1jzdc	Oscar	2025-01-09 18:51:57.436164+01	{928}
1240	m5pml7oao2b9ma1ogt	Hector	2025-01-09 18:51:57.466699+01	{929}
1239	m5pml7o72dwxckfjhp8	Oscar	2025-01-09 18:51:57.463611+01	{929}
1241	m5pml7p2qu5zb8nd1a	Oscar	2025-01-09 18:51:57.494737+01	{930}
1242	m5pml7pxt2opkymbvn	Oscar	2025-01-09 18:51:57.525818+01	{931}
1243	m5pn6votup965hx7jb	Oscar	2025-01-09 19:08:48.36685+01	{932}
1244	m5pn6vpwekcurxikm35	Oscar	2025-01-09 19:08:48.404888+01	{933}
1246	m5pn6vqopt9ugl6agn	Hector	2025-01-09 19:08:48.43262+01	{934}
1245	m5pn6vqjb3fqjbqznza	Oscar	2025-01-09 19:08:48.427936+01	{934}
1247	m5pn6vrfumjylbmljvl	Oscar	2025-01-09 19:08:48.460107+01	{935}
1248	m5pn6vsgndfv8xhma6	Oscar	2025-01-09 19:08:48.497269+01	{936}
1249	m5poahc9pm32v2axgh	Oscar	2025-01-09 19:39:36.010609+01	{937}
1250	m5poahd2utnkej50h7	Oscar	2025-01-09 19:39:36.038496+01	{938}
1252	m5poahdzetvkzdr1os	Hector	2025-01-09 19:39:36.071918+01	{939}
1251	m5poahdvsvomop0ammh	Oscar	2025-01-09 19:39:36.067897+01	{939}
1253	m5poahemoxbhmemohls	Oscar	2025-01-09 19:39:36.094533+01	{940}
1254	m5poahfgk4bkquf1sr	Oscar	2025-01-09 19:39:36.124269+01	{941}
1255	m5poak1smjru4eyz8o	Other2	2025-01-09 19:39:39.521072+01	{}
1256	m5poalf2zkhbm06961s	Other2	2025-01-09 19:39:41.295517+01	{}
1228	m5phodlztrch4j6k0w	Other	2025-01-09 16:34:27.048094+01	{917}
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: oscar
--

COPY public.locations (id, latitude, longitude, altitude, vehicle) FROM stdin;
449	0	0	300	\N
450	0	0	300	\N
451	0	0	300	\N
452	0	0	300	\N
453	12	-60	1000	920
454	0	0	300	\N
455	12	-60	1000	921
456	0	0	300	\N
457	0	0	300	\N
458	0	0	300	\N
459	0	0	300	\N
460	12	-60	1000	925
461	0	0	300	\N
462	12	-60	1000	926
463	0	0	300	\N
464	0	0	300	\N
465	0	0	300	\N
466	0	0	300	\N
467	12	-60	1000	930
468	0	0	300	\N
469	12	-60	1000	931
470	0	0	300	\N
471	0	0	300	\N
472	0	0	300	\N
473	0	0	300	\N
474	12	-60	1000	935
475	0	0	300	\N
476	12	-60	1000	936
477	0	0	300	\N
478	0	0	300	\N
479	0	0	300	\N
480	0	0	300	\N
481	12	-60	1000	940
482	0	0	300	\N
483	12	-60	1000	941
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: oscar
--

COPY public.vehicles (id, number_plate, created_at, type, location) FROM stdin;
917	KM 341 NK	2025-01-09 16:32:42.33082+01	Car	449
918	GE 602 KF	2025-01-09 16:32:42.357495+01	Car	450
919	GH 913 QW	2025-01-09 16:32:42.384445+01	Car	451
920	ON 814 OM	2025-01-09 16:32:42.407822+01	Car	453
921	YA 184 DQ	2025-01-09 16:32:42.440917+01	Car	455
922	AE 385 FD	2025-01-09 16:36:44.650428+01	Car	456
923	KM 856 RM	2025-01-09 16:36:44.678412+01	Car	457
924	SF 590 RX	2025-01-09 16:36:44.706196+01	Car	458
925	PA 786 LO	2025-01-09 16:36:44.729543+01	Car	460
926	UW 135 AT	2025-01-09 16:36:44.758176+01	Car	462
927	DM 189 CI	2025-01-09 18:51:57.413958+01	Car	463
928	TJ 140 ZG	2025-01-09 18:51:57.44092+01	Car	464
929	BU 665 NA	2025-01-09 18:51:57.475842+01	Car	465
930	YY 761 LS	2025-01-09 18:51:57.499628+01	Car	467
931	KQ 422 VR	2025-01-09 18:51:57.530528+01	Car	469
932	KB 987 VG	2025-01-09 19:08:48.384423+01	Car	470
933	OB 398 LK	2025-01-09 19:08:48.409823+01	Car	471
934	RV 982 RT	2025-01-09 19:08:48.436876+01	Car	472
935	HS 366 XF	2025-01-09 19:08:48.464815+01	Car	474
936	RS 460 NZ	2025-01-09 19:08:48.501991+01	Car	476
937	BH 271 EB	2025-01-09 19:39:36.018128+01	Car	477
938	BP 690 IJ	2025-01-09 19:39:36.043273+01	Car	478
939	KP 209 JA	2025-01-09 19:39:36.076215+01	Car	479
940	JN 995 OX	2025-01-09 19:39:36.099703+01	Car	481
941	XW 428 ON	2025-01-09 19:39:36.129354+01	Car	483
\.


--
-- Name: Vehicles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public."Vehicles_id_seq"', 941, true);


--
-- Name: fleets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public.fleets_id_seq', 1256, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: oscar
--

SELECT pg_catalog.setval('public.locations_id_seq', 483, true);


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

