package Log;
use strict;
use warnings;
use DateTime;  # for time

sub new {
    my ($class, %args) = @_;
    my $self = bless {%args}, $class;
    return $self;
}


sub method {
    my $self = shift;
    my @req = split(/ /, $self->{req});
    return $req[0];
}


sub path {
    my $self = shift;
    my @req = split(/ /, $self->{req});
    return $req[1];
}


sub protocol {
    my $self = shift;
    my @req = split(/ /, $self->{req});
    return $req[2];
}


sub uri {
    my $self = shift;
    
    my $protocol = $self->protocol;
    my $head = "";
    if ($protocol =~ /https/ig) { $head = "https://"; }
    elsif ($protocol =~ /http/ig) { $head = "http://"; }
    elsif ($protocol =~ /ftp/ig) { $head = "ftp://"; }
    
    return $head . $self->{host} . $self->path;
}


sub time {
    my $self = shift;
    my $dt = DateTime->from_epoch( epoch => $self->{epoch}, time_zone => 'GMT' );
    return $dt->ymd . "T" . $dt->hms;
    
#    return "2013-07-01T15:59:50";
}


1;
