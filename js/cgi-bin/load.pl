#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use CGI;
use LWP::UserAgent;
#use LWP::Simple;
use Encode qw(from_to);

my $q = CGI->new;
my $url = $q->param("url");
my $ua = LWP::UserAgent->new(agent => "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.63 Safari/537.36");
my $res = $ua->get($url) or die "Couldn't open url";
my $dat = $res->content;
from_to($dat, "Shift-JIS", "UTF-8");

print "Content-type: text/plain; charset=utf-8\n\n";
print $dat;


    

