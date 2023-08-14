--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalog (
    id integer NOT NULL,
    user_id integer,
    description character varying(255) NOT NULL,
    price integer NOT NULL,
    categories integer[] NOT NULL,
    duration integer NOT NULL
);


--
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalog_id_seq OWNED BY public.catalog.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: contracts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contracts (
    id integer NOT NULL,
    service_id integer,
    client_id integer,
    provider_id integer,
    total_price integer NOT NULL,
    requirements character varying(255) NOT NULL,
    start_date timestamp without time zone DEFAULT now(),
    due_date timestamp without time zone NOT NULL,
    active boolean DEFAULT true NOT NULL
);


--
-- Name: contracts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contracts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contracts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contracts_id_seq OWNED BY public.contracts.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    message character varying(255) NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    refresh_token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    city character varying(50),
    phone character varying(10)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: contracts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts ALTER COLUMN id SET DEFAULT nextval('public.contracts_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.catalog VALUES (48, 42, 'Build a rocket and send it to Mars with a 5 men and women and 3 dogs.', 100000000, '{1,2,3}', 782);
INSERT INTO public.catalog VALUES (49, 42, 'Tesla Model X Uber with me as pilot.', 1000000, '{1}', 1);
INSERT INTO public.catalog VALUES (50, 42, 'Tesla Model X Uber with me as pilot.', 1000000, '{1}', 1);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Machine Learning');
INSERT INTO public.categories VALUES (2, 'Block Chain');
INSERT INTO public.categories VALUES (3, 'Information technology');


--
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contracts VALUES (12, 50, 45, 42, 1000000, 'Do it well bro.', '2023-08-14 16:07:23.299733', '2023-08-15 19:07:23.297', true);
INSERT INTO public.contracts VALUES (13, 50, 55, 42, 1000000, 'Do it well bro.', '2023-08-14 16:28:47.89949', '2023-08-15 19:28:47.898', true);
INSERT INTO public.contracts VALUES (14, 49, 55, 42, 1000000, 'Do it well bro.', '2023-08-14 16:29:49.902174', '2023-08-15 19:29:49.901', true);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.messages VALUES (15, 45, 42, 'Welcome bro.');
INSERT INTO public.messages VALUES (16, 55, 42, 'Nice work bro.');
INSERT INTO public.messages VALUES (17, 55, 42, 'Nice work bro.');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJ1c2VybmFtZSI6IkVsb24gTXVzayIsImlhdCI6MTY5MjAzMzU1OCwiZXhwIjoxNjkyMDM3MTU4fQ.vWUYUuICPWCE9IU2mCeT9nWW-Hh12ejfEyfxlH2JEQU', '2023-08-14 14:19:18.25214', 42);
INSERT INTO public.sessions VALUES (118, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ1LCJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjkyMDQwMDIyLCJleHAiOjE2OTIwNDM2MjJ9.qnbMfi8ZQPKegBKsGPMqAzmZUuFRkNnwRV1UVozV9IU', '2023-08-14 16:07:02.363674', 45);
INSERT INTO public.sessions VALUES (120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU1LCJ1c2VybmFtZSI6IkFkbWlubWFpbiIsImlhdCI6MTY5MjA0MTMwNywiZXhwIjoxNjkyMDQ0OTA3fQ.k9lf8JI6Aba4fFwynweZAyfzOz_1qHa4exdbJRA8IKI', '2023-08-14 16:28:27.395582', 55);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (42, 'Elon Musk', '$2b$10$fcqoFNZCBsTN9c.Kvxy1EeWCA7hAnJWg6oeZXQVQPEGBzZw8EkM5i', 'elon@musk.com', '2023-08-14 14:18:43.476639', 'Mars', '9765234561');
INSERT INTO public.users VALUES (43, 'George Hotz', '$2b$10$K0NZmW6UD1.u15kTKfSgaO0PIAsGok0oRxnQjjwhC8HXoejoYJtbC', 'george@hotz.com', '2023-08-14 14:18:43.590305', 'San Francisco', '9876543210');
INSERT INTO public.users VALUES (44, 'Mark Zuckerberg', '$2b$10$kSA1kD873tBV880DwiyYhOcWQibIPdJwRml5cyTvAvXeoXZJdyIxi', 'mark@zuckerberg.com', '2023-08-14 14:18:43.663473', 'Palo Alto', '1234567890');
INSERT INTO public.users VALUES (45, 'Admin', '$2b$10$QHPx252oYb1hmTf2gbCrEepNLFRawWDk4lva0XbVWgj9aWNVuNYK6', 'admin@alysson.com', '2023-08-14 16:06:56.081653', 'Ponta Grossa, Paraná', '4002892210');
INSERT INTO public.users VALUES (55, 'Adminmain', '$2b$10$1XifknLi0nFsU0KW3C84HO4en2omPqqhgiLSzH1bovM88NaTfhCze', 'adminMain@main.com', '2023-08-14 16:24:38.451234', 'Toronto, Parana', '0987654321');


--
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalog_id_seq', 51, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: contracts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contracts_id_seq', 14, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messages_id_seq', 17, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 120, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 55, true);


--
-- Name: catalog catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_refresh_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_refresh_token_key UNIQUE (refresh_token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: catalog catalog_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contracts contracts_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- Name: contracts contracts_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.users(id);


--
-- Name: contracts contracts_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.catalog(id);


--
-- Name: messages messages_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id);


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

