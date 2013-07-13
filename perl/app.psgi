use Data::Dumper;
my $app = sub {
    my ($env) = @_;
    warn Dumper $env;
    unless ($env->{PATH_INFO} eq '/echo') {
        return [404, ['Content-Type' => 'text/plain'], ["not found\n"]];
    }
    my $echo = $env->{QUERY_STRING};
    $echo =~ s/body=(.*)/\1/;
    warn Dumper $echo;
    return [200, ['Content-Type' => 'text/plain'], ["$echo\n"]];
};
